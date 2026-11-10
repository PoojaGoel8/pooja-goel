import { useEffect, useId, useRef, useState } from "react";

import { contactTopics, site, type ContactTopic } from "../data/content";

/**
 * The contact button, opening a short list of topics.
 *
 * Each one is a plain mail link carrying a subject and an opening draft, so
 * the reader lands in a composed message rather than an empty window and the
 * enquiry arrives already sorted.
 *
 * Built as a disclosure, not a menu widget: the panel holds ordinary links,
 * so Tab walks them and Enter follows them with no keyboard contract of my
 * own to get wrong. Escape closes and hands focus back to the button, and a
 * pointer down anywhere outside closes it too.
 */

function mailto(topic: ContactTopic) {
  const subject = encodeURIComponent(topic.subject);
  const body = encodeURIComponent(topic.body.join("\n"));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export default function ContactMenu({
  variant = "bar",
  onPick,
}: {
  /** "bar" floats the panel under the header; "stacked" sits inline. */
  variant?: "bar" | "stacked";
  onPick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const floating = variant === "bar";

  return (
    <div ref={wrap} className={floating ? "relative" : undefined}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-2 rounded-full border border-accent/45 text-accent transition-colors duration-300",
          floating
            ? "px-4 py-1.5 text-[0.9rem] hover:bg-accent hover:text-paper"
            : "px-5 py-2 text-[1rem]",
        ].join(" ")}
      >
        Contact
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={[
            "h-3 w-3 transition-transform duration-300",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <path d="M5 9l7 7 7-7" />
        </svg>
      </button>

      {open && (
        <div
          id={id}
          className={[
            "rounded-[3px] border border-rule bg-paper",
            floating
              ? "absolute right-0 top-full z-50 mt-3 w-[21rem] shadow-[0_18px_40px_-28px_rgba(26,23,20,0.45)]"
              : "mt-3 w-full",
          ].join(" ")}
        >
          <p className="border-b border-rule px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
            What is it about?
          </p>

          <ul className="p-1.5">
            {contactTopics.map((topic) => (
              <li key={topic.label}>
                <a
                  href={mailto(topic)}
                  onClick={() => {
                    setOpen(false);
                    onPick?.();
                  }}
                  className="block rounded-[2px] px-2.5 py-2.5 transition-colors duration-200 hover:bg-accent-soft/50"
                >
                  <span className="block text-[0.95rem] leading-snug text-ink">{topic.label}</span>
                  <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">
                    {topic.hint}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
