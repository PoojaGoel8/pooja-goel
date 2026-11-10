import AiDiagram from "../components/AiDiagram";
import AiHub from "../components/AiHub";
import Reveal from "../components/Reveal";
import { Copy, PageHeader, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import { aiIntro, hackathon } from "../data/content";
import pageMeta from "../data/pageMeta.json";

function Hackathon() {
  return (
    <section className="bg-shell">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
          <Reveal>
            <p className="eyebrow">{hackathon.eyebrow}</p>
            <h2 className="mt-4 font-display text-[1.9rem] font-normal leading-[1.12] tracking-[-0.01em] md:text-[2.5rem]">
              {hackathon.title}
            </h2>
            <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-paper px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent">
              <span aria-hidden>★</span>
              {hackathon.award}
            </p>

            <figure className="mt-10 max-w-[17rem]">
              <img
                src={asset(hackathon.image.src)}
                alt={hackathon.image.alt}
                width={440}
                height={750}
                loading="lazy"
                className="w-full rounded-[2px] object-cover"
              />
              <figcaption className="mt-2.5 text-[0.82rem] text-muted">
                {hackathon.image.caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <p className="copy max-w-prose text-[1.1rem]">{hackathon.summary}</p>

            <div className="mt-9">
              <h3 className="eyebrow">My part in it</h3>
              <div className="mt-5">
                <Copy paragraphs={hackathon.role} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function AiEnablement() {
  usePageMeta(pageMeta.pages.aiEnablement);

  return (
    <>
      <PageHeader
        eyebrow="AI enablement"
        title="Models are the easy part. Getting them to the data is not."
        lede={aiIntro.lede}
        aside={<AiDiagram />}
      />

      <Section eyebrow="The work" title="Five strands, one at a time.">
        <Reveal>
          <AiHub />
        </Reveal>
      </Section>

      <div className="mt-20 md:mt-28">
        <Hackathon />
      </div>

      <Section>
        <Reveal>
          <blockquote className="mx-auto max-w-[36ch] text-center font-display text-[1.6rem] font-normal leading-[1.3] tracking-[-0.01em] md:text-[2.1rem]">
            An AI answer is only as trustworthy as the data path behind it — and somebody has to own
            that path.
          </blockquote>
        </Reveal>
      </Section>
    </>
  );
}
