import Reveal from "../components/Reveal";
import { Copy, PageHeader, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import { tutoring } from "../data/content";

export default function Tutoring() {
  usePageMeta(
    "Tutoring",
    "Four years tutoring Professional IS Consulting at the University of Melbourne, alongside a full-time database engineering role.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Tutoring"
        title="Finding the exact place where an explanation breaks."
        lede={tutoring.lede}
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:gap-16">
          <Reveal>
            <Copy paragraphs={tutoring.body} />
          </Reveal>

          <Reveal delay={120} className="justify-self-center md:justify-self-end">
            <figure>
              <img
                src={asset(tutoring.image.src)}
                alt={tutoring.image.alt}
                width={440}
                height={750}
                loading="lazy"
                className="w-[17rem] rounded-[2px] object-cover md:w-[19rem]"
              />
              <figcaption className="mt-3 max-w-[22ch] text-[0.82rem] leading-relaxed text-muted">
                Same instinct, different room.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
