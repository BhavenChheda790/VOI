"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  createSessionToken,
  getSession,
  setSessionCookie,
  verifyAdminPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/site";
import {
  buildConfirmedMessage,
  buildRejectedMessage,
  sendWhatsAppText,
} from "@/lib/whatsapp";

async function requireAdmin() {
  if (!(await getSession())) redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const user = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (!user || !(await verifyAdminPassword(email, password, user.passwordHash))) {
    redirect("/admin/login?e=1");
  }
  const token = await createSessionToken();
  await setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function updateSiteConfigAction(formData: FormData) {
  await requireAdmin();
  await prisma.siteConfig.update({
    where: { id: 1 },
    data: {
      orgName: String(formData.get("orgName") ?? ""),
      tagline: String(formData.get("tagline") ?? ""),
      logoUrl: emptyToNull(formData.get("logoUrl")),
      whatsappCountryCode: String(formData.get("whatsappCountryCode") ?? "1"),
      whatsappLocalNumber: String(formData.get("whatsappLocalNumber") ?? "").replace(/\D/g, ""),
      zelleEmail: String(formData.get("zelleEmail") ?? ""),
      contactEmail: String(formData.get("contactEmail") ?? ""),
      instagramUrl: emptyToNull(formData.get("instagramUrl")),
      facebookUrl: emptyToNull(formData.get("facebookUrl")),
      homeHeroTitle: String(formData.get("homeHeroTitle") ?? ""),
      homeHeroSubtitle: String(formData.get("homeHeroSubtitle") ?? ""),
      homeQuote: String(formData.get("homeQuote") ?? ""),
      footerTagline: String(formData.get("footerTagline") ?? ""),
      bankName: emptyToNull(formData.get("bankName")),
      bankAccountName: emptyToNull(formData.get("bankAccountName")),
      bankAccountNumber: emptyToNull(formData.get("bankAccountNumber")),
      bankRoutingNumber: emptyToNull(formData.get("bankRoutingNumber")),
      paymentInstructions: emptyToNull(formData.get("paymentInstructions")),
      zelleRecipientName: emptyToNull(formData.get("zelleRecipientName")),
      zellePhone: emptyToNull(formData.get("zellePhone")),
      zelleQrUrl: emptyToNull(formData.get("zelleQrUrl")),
      popupEnabled: formData.get("popupEnabled") === "on",
      popupTitle: emptyToNull(formData.get("popupTitle")),
      popupMessage: emptyToNull(formData.get("popupMessage")),
      botGreeting: emptyToNull(formData.get("botGreeting")),
      botProofAck: emptyToNull(formData.get("botProofAck")),
      botConfirmed: emptyToNull(formData.get("botConfirmed")),
      botRejected: emptyToNull(formData.get("botRejected")),
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/site?ok=1");
}

export async function updatePageAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  const title = String(formData.get("title") ?? "");
  const content = String(formData.get("content") ?? "");
  await prisma.page.update({
    where: { slug },
    data: { title, content },
  });
  revalidatePath(`/${slug}`);
  redirect(`/admin/pages/${slug}?ok=1`);
}

export async function createEventAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(title);
  if (!slug) redirect("/admin/events?e=slug");
  const summary = String(formData.get("summary") ?? "");
  const body = String(formData.get("body") ?? "");
  const kind = String(formData.get("kind") ?? "UPCOMING") === "PAST" ? "PAST" : "UPCOMING";
  const location = emptyToNull(formData.get("location"));
  const imageUrl = emptyToNull(formData.get("imageUrl"));
  const startAt = parseDate(formData.get("startAt"));
  const endAt = parseDate(formData.get("endAt"));
  const ticketUrl = emptyToNull(formData.get("ticketUrl"));
  await prisma.event.create({
    data: {
      title,
      slug,
      summary,
      body,
      kind,
      location: location ?? undefined,
      imageUrl: imageUrl ?? undefined,
      ticketUrl: ticketUrl ?? undefined,
      startAt,
      endAt,
      published: true,
    },
  });
  revalidatePath("/events/upcoming");
  revalidatePath("/events/past");
  redirect("/admin/events?ok=1");
}

export async function updateEventAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const summary = String(formData.get("summary") ?? "");
  const body = String(formData.get("body") ?? "");
  const kind = String(formData.get("kind") ?? "UPCOMING") === "PAST" ? "PAST" : "UPCOMING";
  const location = emptyToNull(formData.get("location"));
  const imageUrl = emptyToNull(formData.get("imageUrl"));
  const startAt = parseDate(formData.get("startAt"));
  const endAt = parseDate(formData.get("endAt"));
  const ticketUrl = emptyToNull(formData.get("ticketUrl"));
  await prisma.event.update({
    where: { id },
    data: {
      title,
      slug: slugify(slug),
      summary,
      body,
      kind,
      location: location ?? null,
      imageUrl: imageUrl ?? null,
      ticketUrl: ticketUrl ?? null,
      startAt,
      endAt,
    },
  });
  revalidatePath("/events/upcoming");
  revalidatePath("/events/past");
  revalidatePath(`/events/${slug}`);
  redirect("/admin/events?ok=1");
}

export async function deleteEventAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.event.delete({ where: { id } });
  revalidatePath("/events/upcoming");
  revalidatePath("/events/past");
  redirect("/admin/events?ok=1");
}

export async function createAlbumAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "");
  const slug = slugify(String(formData.get("slug") ?? title));
  const description = emptyToNull(formData.get("description"));
  const coverUrl = emptyToNull(formData.get("coverUrl"));
  const album = await prisma.galleryAlbum.create({
    data: {
      title,
      slug,
      description: description ?? undefined,
      coverUrl: coverUrl ?? undefined,
    },
  });
  revalidatePath("/gallery");
  redirect(`/admin/gallery/${album.id}?ok=1`);
}

export async function updateAlbumAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "");
  const slug = slugify(String(formData.get("slug") ?? ""));
  const description = emptyToNull(formData.get("description"));
  const coverUrl = emptyToNull(formData.get("coverUrl"));
  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title,
      slug,
      description: description ?? null,
      coverUrl: coverUrl ?? null,
    },
  });
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${slug}`);
  redirect(`/admin/gallery/${id}?ok=1`);
}

export async function addGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const albumId = Number(formData.get("albumId"));
  const url = String(formData.get("url") ?? "");
  const caption = emptyToNull(formData.get("caption"));
  await prisma.galleryImage.create({
    data: { albumId, url, caption: caption ?? undefined },
  });
  revalidatePath("/gallery");
  const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });
  if (album) revalidatePath(`/gallery/${album.slug}`);
  redirect(`/admin/gallery/${albumId}?ok=1`);
}

export async function deleteGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const albumId = Number(formData.get("albumId"));
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/gallery");
  const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });
  if (album) revalidatePath(`/gallery/${album.slug}`);
  redirect(`/admin/gallery/${albumId}?ok=1`);
}

export async function createChatFaqAction(formData: FormData) {
  await requireAdmin();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const keywords = emptyToNull(formData.get("keywords"));
  if (!question || !answer) redirect("/admin/chat-faq?e=required");
  await prisma.chatFaq.create({
    data: {
      question,
      answer,
      keywords: keywords ?? undefined,
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/chat-faq?ok=1");
}

export async function updateChatFaqAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const keywords = emptyToNull(formData.get("keywords"));
  if (!question || !answer) redirect("/admin/chat-faq?e=required");
  await prisma.chatFaq.update({
    where: { id },
    data: {
      question,
      answer,
      keywords: keywords ?? null,
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/chat-faq?ok=1");
}

export async function deleteChatFaqAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.chatFaq.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/chat-faq?ok=1");
}

export async function updateProofStatusAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "PENDING");
  const proof = await prisma.donationProof.update({
    where: { id },
    data: { status },
  });

  // Fire WhatsApp notification when admin reaches a terminal state.
  if ((status === "CONFIRMED" || status === "REJECTED") && !proof.donorNotified) {
    const config = await getSiteConfig();
    const text =
      status === "CONFIRMED"
        ? buildConfirmedMessage(config, proof.waProfileName)
        : buildRejectedMessage(config, proof.waProfileName);
    const result = await sendWhatsAppText(proof.waId, text);
    if (result.ok) {
      await prisma.donationProof.update({
        where: { id },
        data: { donorNotified: true },
      });
    }
  }

  revalidatePath("/admin/proofs");
  redirect("/admin/proofs?ok=1");
}

function emptyToNull(v: FormDataEntryValue | null) {
  const s = String(v ?? "").trim();
  return s.length ? s : null;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseDate(v: FormDataEntryValue | null) {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}
