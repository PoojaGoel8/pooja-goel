import { Link } from "react-router-dom";

import Reveal from "../components/Reveal";
import { Copy, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import {
  arc,
  caseStudies,
  capabilities,
  hero,
  metrics,
  site,
} from "../data/content";

function Hero() {
  return (
    <section className="mx-auto max-w-shell px-6 pb-4 pt-16 md:px-10 md:pt-24">
      <div className="grid items-end gap-12 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <p className="eyebrow animate-rise">
            {site.role} · {site.location}
          </p>

          <h1 className="mt-6 max-w-[13ch] animate-rise font-display text-[2.9rem] font-normal leading-[1.04] tracking-[-0.02em] md:text-[4.4rem]">
            Databases that stay up, stay fast, and
            <span className="text-accent"> stay governed</span>.
          </h1>

          <p className="copy mt-9 max-w-prose animate-rise text-[1.15rem] md:text-[1.3rem]">
            {hero.lede}
          </p>

          <p className="mt-6 max-w-prose animate-rise text-[0.95rem] leading-relaxed text-muted">
            {hero.secondary}
          </p>
        </div>

        <Reveal delay={120} className="justify-self-center md:justify-self-end">
          <figure className="relative">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-accent-soft/70"
            />
            <img
              src={asset("/assets/images/portrait.webp")}
              alt="Pooja Goel"
              width={1000}
              height={1250}
              className="relative w-[18rem] rounded-[2px] object-cover shadow-[0_1px_0_rgba(26,23,20,0.08)] md:w-[21rem]"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16 md:px-10 md:py-20">
      <dl className="grid gap-x-8 gap-y-10 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 80}>
            <div>
              <dt className="font-display text-[2.4rem] font-normal leading-none tracking-[-0.02em] md:text-[2.9rem]">
                {metric.value}
              </dt>
              <dd className="mt-3 max-w-[24ch] text-[0.9rem] leading-relaxed text-muted">
                {metric.label}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function Arc() {
  return (
    <section className="bg-shell">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20">
          <Reveal>
            <p className="eyebrow">{arc.eyebrow}</p>
            <h2 className="mt-4 font-display text-[1.9rem] font-normal leading-[1.12] tracking-[-0.01em] md:text-[2.5rem]">
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
      eyebrow="The practice"
      title="A database role, taken seriously, already touches most of the neighbouring ones."
    >
      <div className="grid gap-px overflow-hidden rounded-[2px] bg-rule sm:grid-cols-2">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.title} delay={i * 70}>
            <article className="flex h-full flex-col bg-paper p-7 md:p-9">
              <h3 className="font-display text-[1.35rem] font-normal leading-snug">
                {cap.title}
              </h3>
              <p className="mt-4 flex-1 text-[0.98rem] leading-[1.7] text-graphite">{cap.body}</p>
              <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">
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
    <Section eyebrow="Selected work" title="Two migrations worth writing down.">
      <div className="grid gap-px overflow-hidden rounded-[2px] bg-rule md:grid-cols-2">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 90}>
            <Link
              to={`/work#${study.slug}`}
              className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-shell md:p-10"
            >
              <h3 className="font-display text-[1.5rem] font-normal leading-tight md:text-[1.75rem]">
                {study.title}
              </h3>
              <p className="mt-5 flex-1 text-[1rem] leading-[1.7] text-graphite">{study.summary}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[0.9rem] text-accent">
                Read the case study
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
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
      to: "/tutoring",
      eyebrow: "Tutoring",
      title: "Four years explaining complex systems to people who needed them to land",
      body: "Postgraduate consulting tutorials at the University of Melbourne, alongside the full-time engineering role.",
    },
  ];

  return (
    <Section eyebrow="Also here" title="The rest of it.">
      <div className="grid gap-px overflow-hidden rounded-[2px] bg-rule md:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.to} delay={i * 80}>
            <Link
              to={card.to}
              className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-shell md:p-8"
            >
              <p className="eyebrow">{card.eyebrow}</p>
              <h3 className="mt-4 font-display text-[1.25rem] font-normal leading-snug">
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
  usePageMeta(
    site.role,
    "Pooja Goel is a database administrator working across SQL Server, PostgreSQL and Azure — high availability, migrations, database security, and the data groundwork that makes AI usable in production.",
  );

  return (
    <>
      <Hero />
      <Metrics />
      <Arc />
      <Capabilities />
      <SelectedWork />
      <Elsewhere />
    </>
  );
}
