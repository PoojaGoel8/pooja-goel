import Reveal from "../components/Reveal";
import { Copy, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import { studioBands, studioIntro, type StudioBand } from "../data/content";

/** Placeholder frame shown in development where photographs are still to come. */
function AwaitingImages({ label }: { label: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex aspect-[4/5] items-center justify-center rounded-[2px] border border-dashed border-accent/40 bg-accent-soft/25 p-6">
      <p className="text-center font-mono text-[0.75rem] leading-relaxed text-accent">{label}</p>
    </div>
  );
}

/**
 * Three photographs set at different heights and widths, so the top of the
 * page reads as a studio wall rather than a tidy grid.
 */
function Collage() {
  const [stage, diwali, aerial] = studioIntro.collage;

  return (
    <div className="grid grid-cols-2 items-end gap-3 md:grid-cols-12 md:gap-4">
      <Reveal className="col-span-2 md:col-span-7">
        <img
          src={asset(stage.src)}
          alt={stage.alt}
          className="h-full w-full rounded-[2px] object-cover md:aspect-[3/2]"
        />
      </Reveal>
      <Reveal delay={120} className="md:col-span-3">
        <img
          src={asset(diwali.src)}
          alt={diwali.alt}
          loading="lazy"
          className="h-full w-full rounded-[2px] object-cover md:aspect-[3/4]"
        />
      </Reveal>
      <Reveal delay={220} className="md:col-span-2">
        <img
          src={asset(aerial.src)}
          alt={aerial.alt}
          loading="lazy"
          className="h-full w-full rounded-[2px] object-cover md:aspect-[2/3]"
        />
      </Reveal>
    </div>
  );
}

function Band({ band, index }: { band: StudioBand; index: number }) {
  const imagesFirst = band.side === "left";
  // A band with no photographs and none expected runs as a single column.
  const hasMedia = band.images.length > 0 || Boolean(band.awaitsImages);

  const media = (
    <div className={band.images.length > 1 ? "grid gap-4 sm:grid-cols-2" : ""}>
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
  );

  const prose = (
    <div>
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[0.8rem] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="eyebrow">{band.eyebrow}</p>
          <h2 className="mt-3 font-display text-[1.9rem] font-normal leading-[1.1] tracking-[-0.01em] md:text-[2.4rem]">
            {band.title}
          </h2>
        </div>
      </div>

      <div className="mt-7">
        <Copy paragraphs={band.body} />
      </div>

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
    </div>
  );

  // A gallery band puts its prose in one column and runs the photographs full
  // width underneath, which suits six images far better than a side-by-side.
  if (band.gallery) {
    return (
      <article
        id={band.slug}
        className="scroll-mt-28 border-t border-rule py-14 first:border-t-0 md:py-20"
      >
        <Reveal>{prose}</Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {band.images.map((image, i) => (
            <Reveal key={image.src} delay={i * 60}>
              <figure className="group overflow-hidden rounded-[2px]">
                <img
                  src={asset(image.src)}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        {band.pullQuote && (
          <Reveal className="mt-12 md:mt-16">
            <blockquote className="mx-auto max-w-[32ch] text-center font-display text-[1.45rem] font-normal leading-[1.3] tracking-[-0.01em] text-graphite md:text-[1.85rem]">
              “{band.pullQuote}”
            </blockquote>
          </Reveal>
        )}
      </article>
    );
  }

  return (
    <article
      id={band.slug}
      className="scroll-mt-28 border-t border-rule py-14 first:border-t-0 md:py-20"
    >
      <div
        className={
          hasMedia
            ? "grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16"
            : ""
        }
      >
        {!hasMedia ? (
          <Reveal>{prose}</Reveal>
        ) : imagesFirst ? (
          <>
            <Reveal className="order-2 md:order-1">{media}</Reveal>
            <Reveal delay={90} className="order-1 md:order-2">
              {prose}
            </Reveal>
          </>
        ) : (
          <>
            <Reveal>{prose}</Reveal>
            <Reveal delay={90}>{media}</Reveal>
          </>
        )}
      </div>

      {band.pullQuote && (
        <Reveal className="mt-12 md:mt-16">
          <blockquote className="mx-auto max-w-[32ch] text-center font-display text-[1.45rem] font-normal leading-[1.3] tracking-[-0.01em] text-graphite md:text-[1.85rem]">
            “{band.pullQuote}”
          </blockquote>
        </Reveal>
      )}
    </article>
  );
}

export default function Studio() {
  usePageMeta(
    "Studio",
    "Face painting with Colourzone Melbourne, portraiture and commissions, Indian dance on festival stages, aerial, and four years tutoring at the University of Melbourne.",
  );

  return (
    <>
      <header className="mx-auto max-w-shell px-6 pb-12 pt-20 md:px-10 md:pb-16 md:pt-28">
        <p className="eyebrow animate-rise">Studio</p>
        <h1 className="mt-5 max-w-[16ch] animate-rise font-display text-[2.6rem] font-normal leading-[1.04] tracking-[-0.02em] md:text-[4rem]">
          The other practice.
        </h1>
        <p className="copy mt-8 max-w-prose animate-rise text-[1.15rem] md:text-[1.25rem]">
          {studioIntro.lede}
        </p>
      </header>

      <div className="mx-auto max-w-shell px-6 md:px-10">
        <Collage />
      </div>

      <section className="mx-auto max-w-shell px-6 py-14 md:px-10 md:py-20">
        <dl className="grid gap-x-8 gap-y-9 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {studioIntro.facts.map((fact, i) => (
            <Reveal key={fact.value} delay={i * 70}>
              <div>
                <dt className="font-display text-[1.6rem] font-normal leading-none tracking-[-0.01em]">
                  {fact.value}
                </dt>
                <dd className="mt-3 max-w-[22ch] text-[0.88rem] leading-relaxed text-muted">
                  {fact.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <Section className="py-0 md:py-0">
        <div>
          {studioBands.map((band, i) => (
            <Band key={band.slug} band={band} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
