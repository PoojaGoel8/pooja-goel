/**
 * Post-build steps for GitHub Pages.
 *
 * 1. Every route gets its own HTML file — work.html, studio.html and so on —
 *    carrying that page's title and description. Pages serves /work from
 *    work.html with a 200, so a deep link is a real page rather than a
 *    "not found" that happens to boot the app, and a link pasted into
 *    LinkedIn or Slack unfurls with the right words: those previews read the
 *    HTML and never run the JavaScript that would otherwise set them.
 * 2. `404.html` is still a copy of `index.html`, for any address that is not
 *    a route. The app boots from it and the router shows the not-found page.
 * 3. `.nojekyll` stops Pages running the output through Jekyll, which would
 *    otherwise drop files and folders beginning with an underscore.
 * 4. When SITE_URL is set — the deploy workflow passes the Pages address —
 *    the pages also get a canonical link and the preview image, and a
 *    sitemap is written. All three need absolute URLs, and the address is
 *    not something the source should hard-code, so a plain local build
 *    simply leaves them out.
 *
 * The titles and descriptions come from src/data/pageMeta.json, the same file
 * the app reads, so the two cannot drift apart.
 */

import { appendFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");

const meta = JSON.parse(await readFile(resolve(root, "src/data/pageMeta.json"), "utf8"));
const template = await readFile(resolve(dist, "index.html"), "utf8");

// Only an absolute address is any use here; anything else is treated as unset.
const given = process.env.SITE_URL ?? "";
const siteUrl = /^https?:\/\//.test(given) ? given.replace(/\/*$/, "/") : null;

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replaces exactly one match, and fails the build if the markup has moved. */
function swap(html, pattern, replacement, what) {
  const matches = html.match(new RegExp(pattern.source, "g"));
  if (matches?.length !== 1) {
    throw new Error(
      `postbuild: expected one ${what} in index.html, found ${matches?.length ?? 0}`,
    );
  }
  return html.replace(pattern, () => replacement);
}

const OG_IMAGE = { file: "og-card.jpg", width: 1200, height: 630 };

function render(page) {
  const title = page.title ? `${page.title} — ${meta.siteName}` : meta.defaultTitle;
  const social = page.social ?? page.description;

  let html = template;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`, "<title>");
  html = swap(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escape(page.description)}" />`,
    "description",
  );
  html = swap(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escape(title)}" />`,
    "og:title",
  );
  html = swap(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escape(social)}" />`,
    "og:description",
  );

  // A page in the light palette starts light, rather than flashing dark until
  // the app loads and switches it. The colours match LIGHT in SiteLayout.
  if (page.theme === "light") {
    html = swap(html, /<html lang="en">/, '<html lang="en" class="theme-light">', "<html>");
    html = swap(
      html,
      /<meta\s+name="theme-color"\s+content="[^"]*"\s*\/>/,
      '<meta name="theme-color" content="#F6F1E9" />',
      "theme-color",
    );
    html = swap(
      html,
      /<meta\s+name="color-scheme"\s+content="[^"]*"\s*\/>/,
      '<meta name="color-scheme" content="light" />',
      "color-scheme",
    );
  }

  if (siteUrl) {
    const url = siteUrl + page.path.slice(1);
    const absolute = [
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${siteUrl}${OG_IMAGE.file}" />`,
      `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
      `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
      `<meta property="og:image:alt" content="${escape(meta.defaultTitle)}" />`,
    ];
    html = swap(html, /<\/head>/, `  ${absolute.join("\n    ")}\n  </head>`, "</head>");
  }

  return html;
}

const pages = Object.values(meta.pages);
const written = [];

for (const page of pages) {
  const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  await writeFile(resolve(dist, file), render(page));
  written.push(file);
}

// Taken from the untouched template, before index.html was rewritten above.
await writeFile(resolve(dist, "404.html"), template);
await writeFile(resolve(dist, ".nojekyll"), "");

if (siteUrl) {
  const urls = pages.map((page) => `  <url><loc>${siteUrl}${page.path.slice(1)}</loc></url>`);
  await writeFile(
    resolve(dist, "sitemap.xml"),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls,
      "</urlset>",
      "",
    ].join("\n"),
  );
  await appendFile(resolve(dist, "robots.txt"), `\nSitemap: ${siteUrl}sitemap.xml\n`);
}

console.log(
  `postbuild: wrote ${written.join(", ")}, 404.html and .nojekyll` +
    (siteUrl ? `, plus sitemap.xml for ${siteUrl}` : " (no SITE_URL, so no canonical or preview image)"),
);
