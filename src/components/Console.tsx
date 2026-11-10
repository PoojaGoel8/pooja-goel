import { useEffect, useRef, useState } from "react";

/**
 * The console pieces: the small bits of database-operations furniture the
 * site is dressed in. Each one decorates content that is also on the page as
 * plain text, so each is hidden from assistive technology, and each holds
 * still under reduced motion.
 */

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fires once, the first time the element scrolls into view. */
function useSeen<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

/** A green "online" light with a slow ping around it. */
export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-flex h-2 w-2 shrink-0 ${className}`}>
      <span className="absolute inset-0 animate-ping rounded-full bg-signal/70" />
      <span className="relative h-2 w-2 rounded-full bg-signal" />
    </span>
  );
}

const sgt = new Intl.DateTimeFormat("en-SG", {
  timeZone: "Asia/Singapore",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** The time in Singapore, kept current to the minute. */
export function SingaporeTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {sgt.format(now)} SGT
    </time>
  );
}

/** Text set around a circle, turning slowly. */
export function RingText({ text, className = "" }: { text: string; className?: string }) {
  const r = 46;
  const length = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full animate-spin-slow ${className}`}
    >
      <defs>
        <path
          id="ring-path"
          d={`M50,50 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`}
        />
      </defs>
      <text className="fill-current font-mono uppercase" style={{ fontSize: 4.1 }}>
        <textPath href="#ring-path" textLength={length} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/**
 * A psql session that types its own query and prints the answer.
 *
 * Expanded display (`\x`) rather than a table, because a table row is wider
 * than a phone and the record layout is narrow enough for any screen.
 */
const PROMPT = "portfolio=#";
const CONT = "portfolio-#";

const query = [
  `${PROMPT} SELECT name, role,`,
  `${CONT}        based_in, stack`,
  `${CONT}   FROM engineers`,
  `${CONT}  WHERE name = 'Pooja Goel';`,
].join("\n");

export type Field = [string, string];

export function Terminal({ fields }: { fields: Field[] }) {
  // Typing starts when the window is on screen, so on a phone, where it sits
  // below the fold, the reader still gets to watch the query go in.
  const [ref, seen] = useSeen<HTMLDivElement>(0.35);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!seen) return;
    if (reducedMotion()) {
      setTyped(query.length);
      setDone(true);
      return;
    }
    let i = 0;
    let timer = 0;
    const tick = () => {
      // A prompt arrives all at once, as it would; only the query is typed.
      const rest = query.slice(i);
      const prompt = [PROMPT, CONT].find((p) => rest.startsWith(p));
      i += prompt ? prompt.length + 1 : 1;
      setTyped(Math.min(i, query.length));
      if (i >= query.length) {
        timer = window.setTimeout(() => setDone(true), 380);
        return;
      }
      timer = window.setTimeout(tick, query[i - 1] === "\n" ? 260 : 30 + Math.random() * 40);
    };
    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [seen]);

  const key = Math.max(...fields.map(([k]) => k.length));
  const value = Math.max(...fields.map(([, v]) => v.length));
  const record = `-[ RECORD 1 ]${"-".repeat(Math.max(4, key + value + 3 - 13))}`;

  return (
    <div
      ref={ref}
      aria-hidden
      className="overflow-hidden rounded-[10px] border border-rule bg-[#0A0908] shadow-[0_30px_80px_-30px_rgba(255,107,61,0.28)]"
    >
      <div className="flex items-center gap-2 border-b border-rule px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          psql · portfolio
        </span>
      </div>
      <pre className="min-h-[19rem] overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-[1.75] text-graphite sm:px-5 sm:text-[13px]">
        <span className="text-muted">Expanded display is on.</span>
        {"\n"}
        {colour(query.slice(0, typed))}
        {!done && <Caret />}
        {done && (
          <>
            {"\n"}
            <span className="text-muted">{record}</span>
            {fields.map(([k, v]) => (
              <span key={k}>
                {"\n"}
                <span className="text-muted">{k.padEnd(key)} |</span>{" "}
                <span className="text-ink">{v}</span>
              </span>
            ))}
            {"\n\n"}
            <span className="text-muted">(1 row)</span>
            {"\n\n"}
            <span className="text-accent">{PROMPT}</span> <Caret />
          </>
        )}
      </pre>
    </div>
  );
}

function Caret() {
  return (
    <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-accent" />
  );
}

/** Light syntax colouring: prompts in accent, keywords bright, strings green. */
function colour(text: string) {
  return text.split(/(portfolio[=-]#|\b(?:SELECT|FROM|WHERE)\b|'[^']*'?)/g).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("portfolio"))
      return (
        <span key={i} className="text-accent">
          {part}
        </span>
      );
    if (/^(SELECT|FROM|WHERE)$/.test(part))
      return (
        <span key={i} className="font-medium text-ink">
          {part}
        </span>
      );
    if (part.startsWith("'"))
      return (
        <span key={i} className="text-signal">
          {part}
        </span>
      );
    return part;
  });
}

/** A band of words running sideways forever. Two copies make the loop seamless. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const run = (copy: number) => (
    <ul className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={`${copy}-${item}`} className="flex items-center whitespace-nowrap">
          <span className={i % 2 ? "poster-outline-paper" : ""}>{item}</span>
          <span className="mx-6 text-[0.45em] md:mx-9">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden className={`flex overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}

/**
 * A figure that counts up from zero the first time it is seen.
 * Keeps any prefix and suffix ("60+", "99.99%") and the number of decimals.
 */
export function CountUp({ value }: { value: string }) {
  const [ref, seen] = useSeen<HTMLSpanElement>(0.5);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)([\d.]+)(.*)$/);
    if (!match || reducedMotion()) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const show = (n: number) => setShown(`${pre}${n.toFixed(decimals)}${post}`);

    if (!seen) {
      show(0);
      return;
    }
    const start = performance.now();
    const duration = 1600;
    let frame = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      show(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [seen, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/** A status-page uptime strip: every bar up, rising left to right when seen. */
export function UptimeStrip({ bars = 60 }: { bars?: number }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.4);
  return (
    <div ref={ref} aria-hidden className="flex h-8 items-end gap-[3px]">
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          style={{ transitionDelay: `${i * 14}ms` }}
          className={[
            "h-full flex-1 origin-bottom rounded-[1px] bg-signal transition-transform duration-500 ease-out",
            seen ? "scale-y-100" : "scale-y-[0.15]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
