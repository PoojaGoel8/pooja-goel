import Reveal from "../components/Reveal";
import { Copy, PageHeader, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import { studioBands, studioIntro } from "../data/content";

/** Placeholder frame shown in development where photographs are still to come. */
function AwaitingImages({ label }: { label: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex aspect-[4/5] items-center justify-center rounded-[2px] border border-dashed border-accent/40 bg-accent-soft/25 p-6">
      <p className="text-center font-mono text-[0.75rem] leading-relaxed text-accent">
        {label}
      </p>
    </div>
  );
}

export default function Studio() {
  usePageMeta(
    "Studio",
    "Face painting with Colourzone Melbourne, aerial and dance, and commissioned work.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Studio"
        title="The other practice."
        lede={studioIntro.lede}
      />

      {studioBands.map((band, index) => (
        <Section key={band.slug} className={index === 0 ? "pt-0 md:pt-0" : ""}>
          <article id={band.slug} className="scroll-mt-28 border-t border-rule pt-12 md:pt-16">
            <div className="grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
              <Reveal>
                <p className="eyebrow">{band.eyebrow}</p>
                <h2 className="mt-4 font-display text-[1.9rem] font-normal leading-[1.12] tracking-[-0.01em] md:text-[2.4rem]">
                  {band.title}
                </h2>
                {band.note && (
                  <p className="mt-7 inline-flex flex-col rounded-[2px] border-l-2 border-accent bg-accent-soft/40 px-4 py-3">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent">
                      {band.note.label}
                    </span>
                    <span className="mt-1.5 text-[0.88rem] text-graphite">{band.note.body}</span>
                  </p>
                )}

                {band.links && (
                  <div className="mt-7 flex flex-col items-start gap-2.5">
                    {band.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[0.95rem] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {link.label}
                        <span aria-hidden>↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>

              <Reveal delay={100}>
                <Copy paragraphs={band.body} />
              </Reveal>
            </div>

            {(band.images.length > 0 || import.meta.env.DEV) && (
              <Reveal className="mt-12">
                <div
                  className={[
                    "grid gap-4",
                    band.images.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
                  ].join(" ")}
                >
                  {band.images.map((image) => (
                    <figure key={image.src}>
                      <img
                        src={asset(image.src)}
                        alt={image.alt}
                        loading="lazy"
                        className="w-full rounded-[2px] object-cover"
                      />
                      {image.caption && (
                        <figcaption className="mt-2.5 text-[0.82rem] leading-relaxed text-muted">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                  {band.images.length === 0 && (
                    <AwaitingImages label={`Photographs to come — ${band.title.toLowerCase()}`} />
                  )}
                </div>
              </Reveal>
            )}
          </article>
        </Section>
      ))}
    </>
  );
}
