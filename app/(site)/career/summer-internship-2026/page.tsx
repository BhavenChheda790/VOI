import Link from "next/link";
import { GoldDivider } from "@/components/Accents";
import { IconArrowRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Summer Internship 2026" };

const APPLICATION_PDF = "/forms/Summer_Internship_Application.pdf";

const steps = [
  { n: 1, title: "Students apply", body: "Tell us your background, skills, and career goals." },
  { n: 2, title: "We review & match", body: "We pair you with roles that fit your qualifications." },
  { n: 3, title: "We connect you", body: "We introduce you to our network of corporate partners." },
  { n: 4, title: "You start your journey", body: "Gain real-world experience and build your network." },
];

const helpItems = [
  "Access to a wide network of corporate partners",
  "Personalized matching based on your qualifications",
  "Guidance throughout the application process",
  "Opportunities across multiple industries",
  "Mentorship and leadership development",
  "Ongoing support to help you succeed",
];

const fields = ["Business", "Marketing", "Finance", "Healthcare", "…and more"];

export default async function SummerInternshipPage() {
  const config = await getSiteConfig();
  const applyMailto = `mailto:${config.contactEmail}?subject=${encodeURIComponent(
    "Summer Internship 2026 — Application — Voice of India USA"
  )}&body=${encodeURIComponent(
    "Hello Voice of India USA team,\n\nPlease find my completed Summer Internship Application attached.\n\nName:\nUniversity / Major:\nField of interest:\n\nThank you,\n"
  )}`;

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] text-white">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#fbbf24]/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#1e40af]/40 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          {/* Breadcrumb */}
          <Link
            href="/career"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-300 transition hover:text-white"
          >
            ← Back to Career
          </Link>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#fbbf24]">
            Voice of India USA · Internship Connections
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Your dream internship is{" "}
            <span className="text-[#fbbf24]">closer than you think</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-200">
            We connect motivated students with corporations that value potential, passion, and
            purpose. We don&apos;t offer internships — we open doors to them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={APPLICATION_PDF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-900 shadow-lg transition hover:bg-[#d97706] hover:text-white"
            >
              Apply today
              <IconArrowRight className="h-4 w-4" />
            </a>
            <a
              href={applyMailto}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              How it works
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
              A simple path from application to opportunity
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d97706]/40 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] font-display text-base font-extrabold text-[#fbbf24]">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-stone-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW WE HELP ============== */}
      <section className="bg-[#fffbeb]/40">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                Why students choose us
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
                How we help students
              </h2>
              <ul className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
                {helpItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 font-semibold text-[#1e3a8a]">
                    <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d97706]/15 text-xs font-bold text-[#d97706]">
                      ✓
                    </span>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] p-8 text-white shadow-lg">
                <p className="text-stone-200">
                  Voice of India USA acts as a <strong>bridge</strong> between ambitious students
                  and reputable corporations looking for emerging talent. We don&apos;t just point
                  students toward jobs — we mentor the next generation of leaders.
                </p>
                <div className="my-7 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#fbbf24]/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#fbbf24]">
                    Our promise
                  </span>
                  <span className="h-px flex-1 bg-[#fbbf24]/40" />
                </div>
                <p className="font-display text-xl font-medium italic leading-snug text-white">
                  “You focus on learning. We focus on finding the right opportunity for you.”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== FIELDS ============== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
              Areas of opportunity
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
              For students pursuing careers in
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {fields.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-stone-200 bg-white px-5 py-2.5 font-display text-sm font-bold text-[#1e3a8a] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d97706]/40 hover:shadow-md"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== HOW TO APPLY ============== */}
      <section className="bg-stone-50/60">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d97706]">
                How to apply
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
                Three simple steps
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-stone-600">
                Follow these steps to submit your application. Takes about 15 minutes.
              </p>
            </div>
          </Reveal>

          {/* Three steps */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <Reveal>
              <ApplyStep
                step={1}
                title="Open & fill the PDF"
                body="Download the Summer Internship Application — it's a fillable PDF. Type your personal info, education, experience, and short answers directly into the form on your computer."
                accent="open"
              />
            </Reveal>
            <Reveal delay={100}>
              <ApplyStep
                step={2}
                title="Attach your résumé"
                body="Save the completed PDF. Then attach it to a new email along with your résumé (and a cover letter or portfolio if you have one)."
                accent="attach"
              />
            </Reveal>
            <Reveal delay={200}>
              <ApplyStep
                step={3}
                title="Email it to us"
                body={
                  <>
                    Send everything to{" "}
                    <a
                      href={`mailto:${config.contactEmail}`}
                      className="font-semibold text-[#1e40af] hover:underline"
                    >
                      {config.contactEmail}
                    </a>{" "}
                    with the subject &quot;Summer Internship Application&quot;. We&apos;ll reply
                    within 3 business days.
                  </>
                }
                accent="send"
              />
            </Reveal>
          </div>

          {/* PDF download card */}
          <Reveal>
            <div className="mt-12 rounded-2xl border-2 border-[#1e3a8a]/15 bg-gradient-to-br from-[#fff7ed] via-white to-[#fffbeb] p-8 shadow-sm sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbbf24] via-[#d97706] to-[#b45309] text-white shadow-md">
                  <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor" aria-hidden>
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-xl font-bold text-stone-900">
                    Summer Internship Application
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    Fillable PDF · 3 pages · ~50 KB · Step 1 of your application
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 sm:items-end">
                  <a
                    href={APPLICATION_PDF}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-900 shadow transition hover:bg-[#d97706] hover:text-white"
                  >
                    Download PDF
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={applyMailto}
                    className="text-xs font-semibold text-[#1e40af] hover:underline"
                  >
                    Or open a pre-filled email →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] text-white">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#fbbf24]/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Ready to take the next step?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-200">
            Let us help you find the right opportunity to launch your career.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APPLICATION_PDF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-900 shadow-lg transition hover:bg-[#d97706] hover:text-white"
            >
              Apply today
              <IconArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ask a question
            </Link>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#fbbf24]">
            More opportunities · Better connections · Brighter futures
          </p>
        </div>
      </section>
    </>
  );
}

function ApplyStep({
  step,
  title,
  body,
  accent,
}: {
  step: number;
  title: string;
  body: React.ReactNode;
  accent: "open" | "attach" | "send";
}) {
  return (
    <div className="relative h-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d97706]/40 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] font-display text-base font-extrabold text-[#fbbf24]">
          {step}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#fff7ed] to-[#fef3c7] text-[#d97706] shadow-inner">
          <StepIcon accent={accent} />
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{body}</p>
    </div>
  );
}

function StepIcon({ accent }: { accent: "open" | "attach" | "send" }) {
  if (accent === "open") {
    // Document with pen
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-3 6h6v1H7v-1zm0 3h6v1H7v-1z" />
      </svg>
    );
  }
  if (accent === "attach") {
    // Paperclip
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path
          d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // send/paper airplane
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M2.01 21l20.99-9L2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}
