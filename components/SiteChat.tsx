"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Msg = { role: "user" | "assistant"; text: string };

export function SiteChat({ orgName }: { orgName: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: `Hi — I’m the **${orgName}** assistant. Ask about donations, events, tickets, or our programs.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch(
        typeof window !== "undefined"
          ? new URL("/api/chat", window.location.origin).toString()
          : "/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        }
      );
      const raw = await res.text();
      let data: { reply?: string; error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { reply?: string; error?: string }) : {};
      } catch {
        data = {};
      }
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text:
              data.error && data.error !== "Server error"
                ? `${data.error} — Try **Contact** in the menu if you need help right away.`
                : "Something went wrong on our side. Please open **Events → Upcoming** from the menu, or use **Contact**.",
          },
        ]);
        return;
      }
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply ?? "Sorry, no reply." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Could not reach the assistant (network error). Please try again or use **Contact** in the menu.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-800 text-white shadow-lg ring-2 ring-amber-200/80 transition hover:bg-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? (
          <span className="text-lg leading-none" aria-hidden>
            ×
          </span>
        ) : (
          <ChatBubbleIcon className="h-7 w-7" />
        )}
      </button>
      {open ? (
        <div
          className="fixed bottom-24 right-5 z-50 flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
          role="dialog"
          aria-label="Site assistant"
        >
          <div className="border-b border-stone-100 bg-stone-900 px-4 py-3 text-sm font-semibold text-white">
            Ask Voice of India
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm leading-relaxed text-stone-800">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "ml-8 rounded-xl bg-amber-50 px-3 py-2 text-right text-stone-900"
                    : "mr-4 rounded-xl bg-stone-100 px-3 py-2 text-stone-900 [&_a]:text-amber-900 [&_a]:underline"
                }
              >
                {msg.role === "user" ? (
                  msg.text
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => (
                        <strong className="font-semibold text-stone-950">{children}</strong>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-3 mb-1 font-display text-base font-semibold text-stone-950 first:mt-0">
                          {children}
                        </h3>
                      ),
                      hr: () => <hr className="my-3 border-stone-200" />,
                      ul: ({ children }) => (
                        <ul className="my-2 list-disc space-y-1 pl-4 text-stone-800">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="my-2 list-decimal space-y-1 pl-4 text-stone-800">{children}</ol>
                      ),
                      li: ({ children }) => <li className="leading-snug">{children}</li>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="font-medium underline underline-offset-2"
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            {loading ? (
              <div className="mr-6 text-xs text-stone-500">Thinking…</div>
            ) : null}
            <div ref={endRef} />
          </div>
          <form
            className="border-t border-stone-100 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-stone-900 placeholder:text-stone-400"
                placeholder="Type a question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 4h16a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4H4a2 2 0 01-2-2V6a2 2 0 012-2zm3 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}
