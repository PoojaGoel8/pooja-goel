import { Link } from "react-router-dom";

import { usePageMeta } from "../components/Page";

export default function NotFound() {
  usePageMeta("Not found");

  return (
    <section className="mx-auto flex max-w-shell flex-col items-start px-6 py-28 md:px-10 md:py-40">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 font-display text-[2.4rem] font-normal leading-[1.1] tracking-[-0.02em] md:text-[3.4rem]">
        That page does not exist.
      </h1>
      <p className="copy mt-6 max-w-prose">
        The link may be out of date, or the address slightly off.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 text-[0.95rem] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      >
        Back to the beginning
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
