import { Suspense, lazy } from "react";

import Reveal from "../components/Reveal";
import Volunteering from "../components/Volunteering";
import { LogoStrip } from "../components/Logo";
import { Icon } from "../components/icons";
import { PageHeader, Section, usePageMeta } from "../components/Page";
import { asset } from "../lib/asset";
import { recognition, skillGroups } from "../data/content";
import pageMeta from "../data/pageMeta.json";

const JourneyMap = lazy(() => import("../components/JourneyMap"));

export default function Experience() {
  usePageMeta(pageMeta.pages.experience);

  return (
    <>
      {/* No lede here, so the stock bottom padding plus the section's top
          padding left a void under the title. */}
      <PageHeader
        eyebrow="Experience"
        className="pb-6 md:pb-8"
      />

      <Section eyebrow="The route here" title="India, Australia, Singapore." className="pt-6 md:pt-10">
        <Reveal>
          {/* Reserve the map's own ratio so the split chunk arriving does not
              shove the page around. */}
          <Suspense fallback={<div className="aspect-[1280/709] w-full" />}>
            <JourneyMap />
          </Suspense>
        </Reveal>
      </Section>

      <Section eyebrow="Recognition" title="Awards and honours.">
        <Reveal>
          <ul className="space-y-5">
            {recognition.map((item) => (
              <li key={item.title}>
                <p className="text-[1rem] leading-snug text-ink">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="py-1.5 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
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
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2">
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
                Master of Information Systems, The University of Melbourne.
              </figcaption>
            </figure>

            <figure>
              <img
                src={asset("/assets/images/award.webp")}
                alt="Pooja receiving a Faculty of Engineering and Information Technology award"
                width={1080}
                height={640}
                loading="lazy"
                className="w-full rounded-[2px] object-cover"
              />
              <figcaption className="mt-3 text-[0.82rem] text-muted">
                Faculty of Engineering and Information Technology awards.
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Volunteering" title="The work beside the work.">
        <Reveal>
          <Volunteering />
        </Reveal>
      </Section>

      <section className="bg-shell">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-10 md:py-28">
          <Reveal className="mb-12 md:mb-16">
            <p className="eyebrow">Capability</p>
            <h2 className="mt-4 font-display text-[1.9rem] font-normal leading-[1.15] tracking-[-0.01em] md:text-[2.5rem]">
              What I work with.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <article className="group flex h-full flex-col rounded-[3px] border border-rule bg-paper p-6 transition-colors duration-300 hover:border-accent/40 md:p-7">
                  <header className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/70 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-paper">
                      <Icon name={group.icon} className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                    <LogoStrip names={group.logos} />
                    <span className="ml-auto shrink-0 font-mono text-[0.7rem] tracking-[0.08em] text-muted">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </header>

                  <h3 className="mt-5 font-display text-[1.15rem] font-normal leading-snug">
                    {group.title}
                  </h3>

                  <ul className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-rule/80 px-2.5 py-1 text-[0.8rem] leading-normal text-graphite"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
