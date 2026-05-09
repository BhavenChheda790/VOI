import type { ChatFaq, Event, Page, SiteConfig } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type ChatReplySource = "faq" | "events" | "llm" | "fallback";

const MAX_MESSAGE_CHARS = 2000;

/** Avoids 500s when migrations are pending or the ChatFaq table is missing. */
async function safePublishedFaqs(): Promise<ChatFaq[]> {
  try {
    return await prisma.chatFaq.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (e) {
    console.error("[chat] ChatFaq query failed — run prisma migrate deploy", e);
    return [];
  }
}

export async function replyToChatMessage(
  userMessage: string
): Promise<{ reply: string; source: ChatReplySource }> {
  const normalized = userMessage.trim().slice(0, MAX_MESSAGE_CHARS);
  if (!normalized) {
    return {
      reply:
        "Hi — ask about Voice of India, upcoming events, tickets, or how to donate.",
      source: "fallback",
    };
  }

  let config: SiteConfig | null;
  let faqs: ChatFaq[];
  let upcoming: Event[];
  let past: Event[];
  let pages: Pick<Page, "slug" | "title">[];
  try {
    [config, faqs, upcoming, past, pages] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { id: 1 } }),
      safePublishedFaqs(),
      prisma.event.findMany({
        where: { published: true, kind: "UPCOMING" },
        orderBy: [{ sortOrder: "asc" }, { startAt: "asc" }],
      }),
      prisma.event.findMany({
        where: { published: true, kind: "PAST" },
        orderBy: [{ startAt: "desc" }, { sortOrder: "asc" }],
        take: 6,
      }),
      prisma.page.findMany({
        select: { slug: true, title: true },
        orderBy: { title: "asc" },
      }),
    ]);
  } catch (e) {
    console.error("[chat] database load failed", e);
    return {
      reply:
        "I can’t load our event and FAQ data right now. Please open **Upcoming** under Events in the menu, or use **Contact**.",
      source: "fallback",
    };
  }

  if (!config) {
    return {
      reply:
        "This assistant is temporarily unavailable (site settings missing). Please use **Contact** in the menu.",
      source: "fallback",
    };
  }

  const faqMatch = matchBestFaq(normalized, faqs);
  if (faqMatch) {
    return { reply: faqMatch.answer, source: "faq" };
  }

  const lower = normalized.toLowerCase();
  const pastIntent = /\b(past|previous|history|last|earlier|recent|prior)\b/.test(lower);
  const eventsIntent =
    /\b(events?|tickets?|register|rsvp|garba|navratri|upcoming|when|where|location|concerts?|comedy|show|shows|conference)\b/i.test(
      lower
    );

  if (eventsIntent && pastIntent) {
    return {
      reply: formatPastEventsAnswer(past, config.orgName),
      source: "events",
    };
  }
  if (eventsIntent) {
    return {
      reply: formatEventsAnswer(upcoming, config.orgName),
      source: "events",
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    const context = buildContextBlock(config, upcoming, past, pages, faqs);
    const llm = await callOpenAI(normalized, context, config.orgName, apiKey);
    if (llm) return { reply: llm, source: "llm" };
  }

  return { reply: formatFallback(config, pages), source: "fallback" };
}

function tokenize(s: string): Set<string> {
  const words = s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
  return new Set(words);
}

function matchBestFaq(message: string, faqs: ChatFaq[]): ChatFaq | null {
  const msgTokens = tokenize(message);
  const msgLower = message.toLowerCase();
  let best: { faq: ChatFaq; score: number } | null = null;

  for (const faq of faqs) {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    if (qLower.length >= 8 && msgLower.includes(qLower)) {
      score += 10;
    }
    if (faq.keywords) {
      for (const kw of faq.keywords
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)) {
        if (kw.length >= 2 && msgLower.includes(kw)) score += 6;
      }
    }
    for (const t of tokenize(faq.question)) {
      if (msgTokens.has(t)) score += 2;
    }
    if (score > 0 && (!best || score > best.score)) best = { faq, score };
  }

  if (best && best.score >= 4) return best.faq;
  return null;
}

function formatEventsAnswer(events: Event[], orgName: string): string {
  if (!events.length) {
    return `There are no upcoming events listed for **${orgName}** right now. Check back soon, or use **Contact** in the menu.`;
  }
  const blocks = events.map((e) => {
    const dateStr = e.startAt
      ? new Date(e.startAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Date TBA";
    const pagePath = `/events/${e.slug}`;
    const lines = [
      `### ${e.title}`,
      "",
      `- **When:** ${dateStr}`,
      ...(e.location ? [`- **Where:** ${e.location}`] : []),
      `- **About:** ${e.summary}`,
      `- **Details:** [Open event page](${pagePath})`,
    ];
    if (e.ticketUrl) {
      lines.push(`- **Tickets:** [Register or get tickets](${e.ticketUrl})`);
    }
    return lines.join("\n");
  });
  return [
    "Here are **upcoming** events:",
    "",
    blocks.join("\n\n---\n\n"),
    "",
    "[Browse all upcoming events →](/events/upcoming)",
  ].join("\n");
}

function formatPastEventsAnswer(events: Event[], orgName: string): string {
  if (!events.length) {
    return `No past events are published for **${orgName}** yet.`;
  }
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const blocks = events.map((e) => {
    const dateStr = e.startAt ? dateFmt.format(e.startAt) : "Date unknown";
    const lines = [
      `### ${e.title}`,
      "",
      `- **When:** ${dateStr}`,
      ...(e.location ? [`- **Where:** ${e.location}`] : []),
      `- **About:** ${e.summary}`,
      `- **Recap:** [Open event page](/events/${e.slug})`,
    ];
    return lines.join("\n");
  });
  return [
    `Here are some **past events** from ${orgName}:`,
    "",
    blocks.join("\n\n---\n\n"),
    "",
    "[Browse all past events →](/events/past)",
  ].join("\n");
}

function formatFallback(config: SiteConfig, pages: Pick<Page, "slug" | "title">[]): string {
  const nav = pages
    .slice(0, 8)
    .map((p) => `**${p.title}** → /${p.slug}`)
    .join("\n");
  return `I don’t have a matching saved answer for that yet.\n\n**Contact:** ${config.contactEmail}\n\n**Pages on this site:**\n${nav}\n\nTip: ask about **donations**, **events**, or **tickets** for quick answers.`;
}

function buildContextBlock(
  config: SiteConfig,
  upcoming: Event[],
  past: Event[],
  pages: Pick<Page, "slug" | "title">[],
  faqs: ChatFaq[]
): string {
  const fmt = (e: Event) => {
    const start = e.startAt ? new Date(e.startAt).toISOString() : "TBA";
    return `- ${e.title} (${start}) slug=${e.slug} location=${e.location ?? "TBA"} ticketUrl=${e.ticketUrl ?? "none"} summary=${e.summary}`;
  };
  const upcomingLines = upcoming.map(fmt);
  const pastLines = past.map(fmt);
  const pageLines = pages.map((p) => `- /${p.slug} — ${p.title}`);
  const faqLines = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`);

  return [
    `Organization: ${config.orgName}`,
    `Tagline: ${config.tagline}`,
    `Contact email: ${config.contactEmail}`,
    `Zelle (donations): ${config.zelleEmail}`,
    `WhatsApp: +${config.whatsappCountryCode}${config.whatsappLocalNumber}`,
    config.instagramUrl ? `Instagram: ${config.instagramUrl}` : null,
    config.facebookUrl ? `Facebook: ${config.facebookUrl}` : null,
    "",
    "Site pages:",
    ...pageLines,
    "",
    "Upcoming events:",
    ...upcomingLines,
    "",
    "Past events:",
    ...pastLines,
    "",
    "Curated FAQ entries:",
    ...faqLines,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

async function callOpenAI(
  userMessage: string,
  context: string,
  orgName: string,
  apiKey: string
): Promise<string | null> {
  const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `You are the website assistant for ${orgName}. Answer ONLY using the CONTEXT below. If something is not in the context, say briefly that you do not have that detail and give the contact email from context. Be warm and concise (under 140 words). Use markdown sparingly (**bold**). Do not invent dates, URLs, sponsors, or policies.\n\nCONTEXT:\n${context}`,
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 450,
        temperature: 0.25,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch {
    return null;
  }
}
