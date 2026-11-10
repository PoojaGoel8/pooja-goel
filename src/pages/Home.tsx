import { Link } from "react-router-dom";

import Reveal from "../components/Reveal";
import { Icon } from "../components/icons";
import { Copy, Section, usePageMeta } from "../components/Page";
import {
  CountUp,
  Marquee,
  RingText,
  SingaporeTime,
  StatusDot,
  Terminal,
  UptimeStrip,
} from "../components/Console";
import { asset } from "../lib/asset";
import {
  arc,
  caseStudies,
  capabilities,
  hero,
  metrics,
  site,
  skillGroups,
} from "../data/content";
import pageMeta from "../data/pageMeta.json";

const RING = "Database Administrator ✦ SQL Server ✦ PostgreSQL ✦ Azure ✦ High availability ✦ ";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* The glow the portrait sits in. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[19rem] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.16] blur-[110px] md:top-[24rem] md:h-[44rem] md:w-[44rem]"
      />

      <div className="relative mx-auto max-w-shell px-6 pt-7 md:px-10 md:pt-10">
        <div className="flex animate-rise items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-label text-muted">
          <span className="flex items-center gap-2.5">
            <StatusDot />
            <span>
              Online · {site.location}
              <span className="hidden sm:inline">
                {" "}
                · <SingaporeTime />
              </span>
            </span>
          </span>
          <span className="hidden sm:inline">Portfolio ↓</span>
        </div>

        <div className="relative mt-10 flex flex-col items-center md:mt-8">
          <div className="relative aspect-square w-[min(80vw,26rem)] animate-rise text-muted">
            <RingText text={RING} />
            <div className="absolute inset-[12%] overflow-hidden rounded-full border border-rule bg-shell">
              <img
                src={asset("/assets/images/portrait.webp")}
                alt="Pooja Goel"
                width={1000}
                height={1250}
                className="h-full w-full scale-[1.12] object-cover object-[50%_22%]"
              />
            </div>
          </div>

          <h1 className="poster relative -mt-[0.5em] animate-rise whitespace-nowrap text-center text-[clamp(4.4rem,17vw,16rem)] text-ink [text-shadow:0_10px_50px_rgba(0,0,0,0.55)]">
            Pooja Goel<span className="text-accent">.</span>
          </h1>
        </div>

        <div className="mt-14 grid gap-12 pb-16 md:mt-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-16 md:pb-24">
          <div>
            <p className="eyebrow">
              {site.role} · {site.location}
            </p>
            <p className="mt-5 max-w-[17ch] font-display text-[2.15rem] font-normal leading-[1.06] tracking-[-0.025em] md:text-[3.1rem]">
              Databases that stay up, stay fast, and
              <span className="text-accent"> stay governed</span>.
            </p>
            <p className="copy mt-8 max-w-prose text-[1.08rem] md:text-[1.15rem]">{hero.lede}</p>
            <p className="mt-5 max-w-prose text-[0.95rem] leading-relaxed text-muted">
              {hero.secondary}
            </p>
          </div>

          <Reveal delay={120}>
            <Terminal
              fields={[
                ["name", site.name],
                ["role", site.role],
                ["based_in", site.location],
                ["stack", "SQL Server, PostgreSQL, Azure"],
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** The working vocabulary, on a band of tape across the page. */
const STACK = [
  "SQL Server",
  "PostgreSQL",
  "Azure SQL",
  "High availability",
  "Replication",
  "Query tuning",
  "Backup and restore",
  "Disaster recovery",
  "Database migration",
  "Index tuning",
];

function StackBand() {
  // Every word comes from the skills on the Experience page, so the band can
  // never claim something the CV does not.
  const known = new Set(skillGroups.flatMap((group) => group.items));
  const items = STACK.map((item) =>
    item === "SQL Server" ? "Microsoft SQL Server" : item,
  )
    .filter((item) => known.has(item))
    .map((item) => item.replace("Microsoft ", ""));

  return (
    <div className="overflow-hidden py-8 md:py-12">
      <div className="-mx-6 -rotate-[2deg] bg-accent py-3.5 text-paper md:py-5">
        <Marquee items={items} className="poster text-[2.3rem] md:text-[3.4rem]" />
      </div>
    </div>
  );
}

function Metrics() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16 md:px-10 md:py-24">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-5">
          <p className="eyebrow">[01] System status</p>
          <p className="flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-label text-signal">
            <StatusDot />
            All systems operational
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <UptimeStrip bars={64} />
        <div className="mt-3 flex justify-between font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted">
          <span>Production estate</span>
          <span>{metrics[0].value} available</span>
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-rule bg-rule lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div key={metric.label} className="flex flex-col bg-paper p-4 sm:p-6 md:p-8">
              <dt>
                <span aria-hidden className="block font-mono text-[0.64rem] text-muted">
                  [0{i + 1}]
                </span>
                <span className="poster mt-6 block text-[2.55rem] text-ink sm:text-[3.4rem] md:text-[4.4rem]">
                  <CountUp value={metric.value} />
                </span>
              </dt>
              <dd className="mt-4 max-w-[24ch] text-[0.86rem] leading-relaxed text-muted md:text-[0.92rem]">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Arc() {
  return (
    <section className="border-y border-rule bg-shell">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20">
          <Reveal>
            <p className="eyebrow">[02] {arc.eyebrow}</p>
            <h2 className="mt-5 font-display text-[1.9rem] font-normal leading-[1.1] tracking-[-0.02em] md:text-[2.6rem]">
              {arc.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Copy paragraphs={arc.body} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <Section
      eyebrow="[03] The practice"
      title="A database role, taken seriously, already touches most of the neighbouring ones."
    >
      <div className="grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-2">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.title} delay={i * 70}>
            <article className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-500 hover:bg-shell md:p-9">
              <div className="flex items-start justify-between">
                <Icon
                  name={cap.icon}
                  className="h-7 w-7 text-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                />
                <span className="font-mono text-[0.68rem] text-muted">[0{i + 1}]</span>
              </div>
              <h3 className="mt-6 font-display text-[1.4rem] font-normal leading-snug tracking-[-0.01em]">
                {cap.title}
              </h3>
              <p className="mt-4 flex-1 text-[0.98rem] leading-[1.7] text-graphite">{cap.body}</p>
              <p className="mt-6 border-t border-rule pt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                {cap.adjacency}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function SelectedWork() {
  return (
    <Section eyebrow="[04] Selected work" title="Two migrations worth writing down.">
      <ol className="border-b border-rule">
        {caseStudies.map((study, i) => (
          <li key={study.slug}>
            <Reveal delay={i * 90}>
              <Link
                to={`/work#${study.slug}`}
                className="group grid gap-x-8 gap-y-4 border-t border-rule py-9 transition-colors md:grid-cols-[4rem_minmax(0,1fr)_3rem] md:items-start md:py-12"
              >
                <span className="font-mono text-[0.8rem] text-accent">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span>
                  <span className="block font-display text-[1.6rem] font-normal leading-tight tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent md:text-[2.3rem]">
                    {study.title}
                  </span>
                  <span className="mt-4 block max-w-prose text-[1rem] leading-[1.7] text-graphite">
                    {study.summary}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent md:hidden">
                    Read the case study →
                  </span>
                </span>
                <span
                  aria-hidden
                  className="hidden h-12 w-12 items-center justify-center rounded-full border border-rule text-[1.1rem] text-ink transition-all duration-300 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper md:flex"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Elsewhere() {
  const cards = [
    {
      to: "/ai-enablement",
      eyebrow: "AI enablement",
      title: "Where the database team decides whether AI is real",
      body: "A knowledge assistant, agentic alert diagnosis, six automated workflows, and a hackathon entry that needed Databricks and Azure AI Foundry to trust each other.",
    },
    {
      to: "/studio",
      eyebrow: "Studio",
      title: "Face paint, portraiture, festival stages",
      body: "Colourzone Melbourne, a portrait that UMSU Creative Arts picked out, and Indian dance on a screen above Federation Square.",
    },
    {
      to: "/studio#tutoring",
      eyebrow: "Tutoring",
      title: "Four years explaining complex systems to people who needed them to land",
      body: "Postgraduate consulting tutorials at the University of Melbourne, alongside the full-time engineering role.",
    },
  ];

  return (
    <Section eyebrow="[05] Also here" title="The rest of it.">
      <div className="grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule md:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.to} delay={i * 80}>
            <Link
              to={card.to}
              className="group flex h-full flex-col bg-paper p-7 transition-colors duration-300 hover:bg-shell md:p-8"
            >
              <p className="eyebrow">{card.eyebrow}</p>
              <h3 className="mt-4 font-display text-[1.3rem] font-normal leading-snug tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-muted">{card.body}</p>
              <span
                aria-hidden
                className="mt-7 text-accent transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function Home() {
  usePageMeta(pageMeta.pages.home);

  return (
    <>
      <Hero />
      <StackBand />
      <Metrics />
      <Arc />
      <Capabilities />
      <SelectedWork />
      <Elsewhere />
    </>
  );
}
