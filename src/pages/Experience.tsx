import Reveal from "../components/Reveal";
import { PageHeader, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import { advocacy, education, recognition, roles, skillGroups } from "../data/content";

export default function Experience() {
  usePageMeta(
    "Experience",
    "Roles, education and recognition — Data Services Engineer at PointsBet, Master of Information Systems at the University of Melbourne.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Four years of production, and the training that preceded it."
      />

      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="border-t border-rule">
          {roles.map((role) => (
            <Reveal key={`${role.title}-${role.period}`}>
              <article className="grid gap-5 border-b border-rule py-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.4fr)] md:gap-14 md:py-14">
                <div>
                  <h2 className="font-display text-[1.35rem] font-normal leading-snug">
                    {role.title}
                  </h2>
                  <p className="mt-2 text-[0.95rem] text-graphite">{role.org}</p>
                  <p className="mt-1 text-[0.85rem] text-muted">{role.place}</p>
                  <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-accent">
                    {role.period}
                  </p>
                </div>

                <ul className="space-y-4">
                  {role.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3.5 text-[1.0425rem] leading-[1.72] text-graphite"
                    >
                      <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-rule" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Section eyebrow="Education" title="Melbourne, by way of Chennai.">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
          <div className="space-y-10">
            {education.map((item) => (
              <Reveal key={item.title}>
                <article>
                  <h3 className="font-display text-[1.3rem] font-normal leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] text-graphite">{item.org}</p>
                  <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted">
                    {item.period}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {item.notes.map((note) => (
                      <li key={note} className="flex gap-3 text-[0.95rem] text-graphite">
                        <span aria-hidden className="text-accent">
                          ·
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <article className="rule-top pt-8">
                <h3 className="eyebrow">Recognition</h3>
                <ul className="mt-5 space-y-5">
                  {recognition.map((item) => (
                    <li key={item.title}>
                      <p className="text-[1rem] leading-snug text-ink">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {item.title}
                            <span aria-hidden> ↗</span>
                          </a>
                        ) : (
                          item.title
                        )}
                      </p>
                      <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">{item.org}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article className="rule-top pt-8">
                <h3 className="eyebrow">{advocacy.title}</h3>
                <p className="mt-3 max-w-prose text-[1rem] leading-[1.7] text-graphite">
                  {advocacy.body}
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <figure>
              <img
                src={asset("/assets/images/graduation.webp")}
                alt="Pooja receiving her Master of Information Systems at the University of Melbourne"
                width={1400}
                height={784}
                loading="lazy"
                className="w-full rounded-[2px] object-cover"
              />
              <figcaption className="mt-3 text-[0.82rem] text-muted">
                Master of Information Systems, the University of Melbourne.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <section className="bg-shell">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-10 md:py-28">
          <Reveal className="mb-12 md:mb-16">
            <p className="eyebrow">Capability</p>
            <h2 className="mt-4 font-display text-[1.9rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[2.5rem]">
              What I work with.
            </h2>
          </Reveal>

          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <div>
                  <h3 className="border-b border-rule pb-3 font-display text-[1.1rem] font-normal">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-[0.95rem] leading-relaxed text-graphite">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
