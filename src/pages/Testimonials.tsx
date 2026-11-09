import Reveal from "../components/Reveal";
import { PageHeader, usePageMeta } from "../components/Page";
import { testimonials } from "../data/content";

export default function Testimonials() {
  usePageMeta("Testimonials", "What colleagues, managers and students have said.");

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="In other people's words."
        lede={
          testimonials.length
            ? undefined
            : "This page is built and waiting on its quotes. Add them to `testimonials` in src/data/content.ts and it joins the navigation automatically."
        }
      />

      {testimonials.length > 0 && (
        <div className="mx-auto max-w-shell px-6 pb-8 md:px-10">
          <div className="border-t border-rule">
            {testimonials.map((item) => (
              <Reveal key={item.name}>
                <figure className="grid gap-6 border-b border-rule py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] md:gap-14 md:py-16">
                  <blockquote className="font-display text-[1.35rem] font-normal leading-[1.4] tracking-[-0.01em] md:text-[1.7rem]">
                    “{item.quote}”
                  </blockquote>
                  <figcaption>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="mt-1.5 text-[0.9rem] text-graphite">{item.role}</p>
                    <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                      {item.relationship}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
