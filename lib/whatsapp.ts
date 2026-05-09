import type { SiteConfig } from "@prisma/client";

const GRAPH_API_VERSION = "v21.0";

type SendResult = { ok: boolean; status: number; body?: unknown };

function getCredentials() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return null;
  return { token, phoneNumberId };
}

export async function sendWhatsAppText(to: string, body: string): Promise<SendResult> {
  const creds = getCredentials();
  if (!creds) {
    console.warn("[whatsapp] WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID not set — skipping send");
    return { ok: false, status: 0, body: "missing credentials" };
  }
  const to_digits = to.replace(/\D/g, "");
  if (!to_digits) return { ok: false, status: 0, body: "invalid recipient" };

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${creds.phoneNumberId}/messages`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to_digits,
        type: "text",
        text: { preview_url: false, body },
      }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("[whatsapp] send failed", res.status, json);
    }
    return { ok: res.ok, status: res.status, body: json };
  } catch (err) {
    console.error("[whatsapp] send threw", err);
    return { ok: false, status: 0, body: String(err) };
  }
}

function firstName(profileName: string | null | undefined): string {
  if (!profileName) return "friend";
  const n = profileName.trim().split(/\s+/)[0];
  return n || "friend";
}

export function buildGreetingMessage(config: SiteConfig, profileName: string | null | undefined): string {
  if (config.botGreeting && config.botGreeting.trim()) {
    return renderTemplate(config.botGreeting, config, profileName);
  }
  const name = firstName(profileName);
  const lines: string[] = [];
  lines.push(`🙏 Namaste ${name}! Thank you for choosing to support *${config.orgName}*.`);
  lines.push("");
  lines.push("Your donation fuels women empowerment, cultural programs, and student mentorship across the USA.");
  lines.push("");
  lines.push("*Ways to contribute:*");
  lines.push("");
  lines.push(`• *Zelle* — ${config.zelleEmail}`);
  if (config.bankAccountName || config.bankAccountNumber) {
    lines.push("");
    lines.push("*Bank transfer:*");
    if (config.bankName) lines.push(`  Bank: ${config.bankName}`);
    if (config.bankAccountName) lines.push(`  Account name: ${config.bankAccountName}`);
    if (config.bankAccountNumber) lines.push(`  Account #: ${config.bankAccountNumber}`);
    if (config.bankRoutingNumber) lines.push(`  Routing #: ${config.bankRoutingNumber}`);
  }
  if (config.paymentInstructions && config.paymentInstructions.trim()) {
    lines.push("");
    lines.push(config.paymentInstructions.trim());
  }
  lines.push("");
  lines.push("📸 After you pay, please send the *payment screenshot* right here in this chat. Our team will verify and confirm your donation.");
  lines.push("");
  lines.push("🌸 धन्यवाद! With gratitude, Team VOI.");
  return lines.join("\n");
}

export function buildProofAckMessage(config: SiteConfig, profileName: string | null | undefined): string {
  if (config.botProofAck && config.botProofAck.trim()) {
    return renderTemplate(config.botProofAck, config, profileName);
  }
  const name = firstName(profileName);
  return [
    `✅ Thank you, ${name}! We've received your payment proof.`,
    "",
    "Our team will verify it against our records and send you a confirmation here shortly.",
    "",
    "🙏 With gratitude, Team VOI.",
  ].join("\n");
}

export function buildConfirmedMessage(config: SiteConfig, profileName: string | null | undefined): string {
  if (config.botConfirmed && config.botConfirmed.trim()) {
    return renderTemplate(config.botConfirmed, config, profileName);
  }
  const name = firstName(profileName);
  return [
    `🌸 Donation confirmed — thank you, ${name}!`,
    "",
    `Your generosity supports *${config.orgName}* programs: women in leadership, cultural celebration, and student mentorship.`,
    "",
    "If you'd like a written acknowledgement for your records, reply here and we'll send one.",
    "",
    "🙏 धन्यवाद — Team VOI.",
  ].join("\n");
}

export function buildRejectedMessage(config: SiteConfig, profileName: string | null | undefined): string {
  if (config.botRejected && config.botRejected.trim()) {
    return renderTemplate(config.botRejected, config, profileName);
  }
  const name = firstName(profileName);
  return [
    `Hi ${name}, we couldn't match your payment with our records yet.`,
    "",
    "Could you please resend the *screenshot or transaction reference* (date, amount, and reference id)? We'll verify right away.",
    "",
    `Reply in this chat or email ${config.contactEmail} for help.`,
    "",
    "— Team VOI",
  ].join("\n");
}

function renderTemplate(tpl: string, config: SiteConfig, profileName: string | null | undefined): string {
  const name = firstName(profileName);
  return tpl
    .replace(/\{\{\s*name\s*\}\}/gi, name)
    .replace(/\{\{\s*org\s*\}\}/gi, config.orgName)
    .replace(/\{\{\s*zelle\s*\}\}/gi, config.zelleEmail)
    .replace(/\{\{\s*bankName\s*\}\}/gi, config.bankName ?? "")
    .replace(/\{\{\s*bankAccountName\s*\}\}/gi, config.bankAccountName ?? "")
    .replace(/\{\{\s*bankAccountNumber\s*\}\}/gi, config.bankAccountNumber ?? "")
    .replace(/\{\{\s*bankRoutingNumber\s*\}\}/gi, config.bankRoutingNumber ?? "");
}
