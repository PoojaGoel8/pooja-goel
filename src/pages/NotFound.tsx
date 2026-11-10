import { Link } from "react-router-dom";

import { usePageMeta } from "../components/Page";

export default function NotFound() {
  usePageMeta({ title: "Not found" });

  return (
    <section className="mx-auto flex max-w-shell flex-col items-start px-6 py-16 md:px-10 md:py-24">
      <p aria-hidden className="poster text-[clamp(6rem,30vw,20rem)] text-ink">
        404<span className="text-accent">.</span>
      </p>
      <p className="eyebrow mt-8">[ Error 404 ] · 0 rows returned</p>
      <h1 className="mt-5 font-display text-[2.4rem] font-normal leading-[1.1] tracking-[-0.02em] md:text-[3.4rem]">
        That page does not exist.
      </h1>
      <p className="copy mt-6 max-w-prose">
        The link may be out of date, or the address slightly off.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 py-2 text-[0.95rem] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      >
        Back to the beginning
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
