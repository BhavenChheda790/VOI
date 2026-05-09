import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Tone = "default" | "onDark";

export function MarkdownBody({ content, tone = "default" }: { content: string; tone?: Tone }) {
  const isDark = tone === "onDark";

  return (
    <div
      className={`markdown-body space-y-4 leading-relaxed ${isDark ? "text-stone-200" : "text-stone-700"}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (p) => (
            <h1
              className={`font-display text-2xl font-semibold mt-8 first:mt-0 ${isDark ? "text-[#fde68a]" : "text-[color:var(--voi-maroon-deep)]"}`}
              {...p}
            />
          ),
          h2: (p) => (
            <h2
              className={`font-display text-xl font-semibold mt-8 ${isDark ? "text-[#fde68a]" : "text-[color:var(--voi-maroon)]"}`}
              {...p}
            />
          ),
          h3: (p) => (
            <h3 className={`text-lg font-semibold mt-6 ${isDark ? "text-stone-100" : "text-stone-900"}`} {...p} />
          ),
          p: (p) => <p className="whitespace-pre-wrap" {...p} />,
          ul: (p) => (
            <ul
              className={`list-disc pl-6 space-y-2 ${isDark ? "marker:text-amber-300/80" : "marker:text-[color:var(--voi-saffron)]"}`}
              {...p}
            />
          ),
          ol: (p) => <ol className="list-decimal pl-6 space-y-2" {...p} />,
          a: ({ href, children, ...rest }) => (
            <a
              href={href}
              className={
                isDark
                  ? "font-semibold text-amber-200 underline decoration-amber-400/50 underline-offset-2 hover:text-white"
                  : "font-medium text-[color:var(--voi-maroon)] underline decoration-[color:var(--voi-gold)]/50 underline-offset-2 hover:decoration-[color:var(--voi-gold)]"
              }
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
              {...rest}
            >
              {children}
            </a>
          ),
          strong: (p) => (
            <strong
              className={`font-semibold ${isDark ? "text-[#fef3c7]" : "text-[color:var(--voi-maroon-deep)]"}`}
              {...p}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
