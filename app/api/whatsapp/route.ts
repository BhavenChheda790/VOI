import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/site";
import {
  buildGreetingMessage,
  buildProofAckMessage,
  sendWhatsAppImage,
  sendWhatsAppText,
} from "@/lib/whatsapp";

export const runtime = "nodejs";

/**
 * Meta WhatsApp Cloud API webhook.
 * GET  — verification (hub.mode, hub.verify_token, hub.challenge)
 * POST — incoming messages: stores DonationProof rows and auto-replies.
 *
 * Env:
 *   WHATSAPP_VERIFY_TOKEN       required for webhook verification
 *   WHATSAPP_ACCESS_TOKEN       required to download media + send replies
 *   WHATSAPP_PHONE_NUMBER_ID    required to send replies
 */
export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  const verify = process.env.WHATSAPP_VERIFY_TOKEN;
  if (mode === "subscribe" && verify && token === verify && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

type WaPayload = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from?: string;
          id?: string;
          type?: string;
          text?: { body?: string };
          image?: { id?: string; mime_type?: string };
          document?: { id?: string; mime_type?: string };
        }>;
        contacts?: Array<{ profile?: { name?: string }; wa_id?: string }>;
      };
    }>;
  }>;
};

export async function POST(req: NextRequest) {
  let body: WaPayload;
  try {
    body = (await req.json()) as WaPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
  const contacts = body.entry?.[0]?.changes?.[0]?.value?.contacts;
  const profileName = contacts?.[0]?.profile?.name ?? null;

  if (!messages?.length) {
    return NextResponse.json({ ok: true });
  }

  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const config = await getSiteConfig();

  for (const msg of messages) {
    const from = msg.from ?? "unknown";
    let lastMessage: string | null = null;
    let mediaUrl: string | null = null;
    let mediaMime: string | null = null;
    const type = msg.type ?? "unknown";

    if (msg.type === "text" && msg.text?.body) {
      lastMessage = msg.text.body;
    } else if (msg.type === "image" && msg.image?.id) {
      lastMessage = `[image] id=${msg.image.id}`;
      mediaMime = msg.image.mime_type ?? null;
      if (token) {
        mediaUrl = await fetchMediaUrl(msg.image.id, token);
      }
    } else if (msg.type === "document" && msg.document?.id) {
      lastMessage = `[document] id=${msg.document.id}`;
      mediaMime = msg.document.mime_type ?? null;
      if (token) {
        mediaUrl = await fetchMediaUrl(msg.document.id, token);
      }
    } else {
      lastMessage = msg.type ? `[${msg.type}]` : "[message]";
    }

    const proof = await prisma.donationProof.create({
      data: {
        waId: from,
        waProfileName: profileName,
        lastMessage,
        mediaUrl,
        mediaMimeType: mediaMime,
        messageType: type,
        status: "PENDING",
      },
    });

    // Decide auto-reply
    const isMedia = type === "image" || type === "document";
    let replyBody: string | null = null;

    if (isMedia) {
      replyBody = buildProofAckMessage(config, profileName);
    } else if (type === "text") {
      // Greet if this is their first interaction, or if the message looks donation-intent.
      const priorCount = await prisma.donationProof.count({
        where: { waId: from, id: { lt: proof.id } },
      });
      const bodyText = (msg.text?.body ?? "").toLowerCase();
      const donationIntent =
        /\b(donat|contrib|zelle|bank|pay|support|help|seva)\b/.test(bodyText) ||
        priorCount === 0;
      if (donationIntent) {
        replyBody = buildGreetingMessage(config, profileName);
      }
    }

    if (replyBody) {
      const result = await sendWhatsAppText(from, replyBody);
      if (result.ok) {
        await prisma.donationProof.update({
          where: { id: proof.id },
          data: { botReplied: true },
        });
      }

      // After the donation-intent / first-touch greeting, also send the Zelle
      // QR image with a clear "pay then send screenshot" caption. Only fires
      // for greetings (replyBody === buildGreetingMessage(...)).
      const isGreeting = type === "text" && replyBody?.includes("धन्यवाद");
      if (isGreeting && config.zelleQrUrl) {
        const origin = req.nextUrl.origin;
        const qrPublicUrl = `${origin}/api/media/zelle-qr`;
        await sendWhatsAppImage(
          from,
          qrPublicUrl,
          [
            "📱 *Scan this QR* in your banking app to pay via Zelle.",
            "",
            `*Recipient:* ${config.zelleRecipientName ?? "VOICE OF INDIA CORPORATION"}`,
            `*Phone:* ${config.zellePhone ?? "909-696-0066"}`,
            "",
            "✅ *Once you've paid, please send the payment screenshot here.* Our team will verify and confirm your donation.",
            "",
            "🙏 With gratitude — Team VOI.",
          ].join("\n")
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}

async function fetchMediaUrl(mediaId: string, token: string): Promise<string | null> {
  try {
    const meta = await fetch(`https://graph.facebook.com/v21.0/${mediaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!meta.ok) return null;
    const j = (await meta.json()) as { url?: string };
    if (!j.url) return null;
    return j.url;
  } catch {
    return null;
  }
}
