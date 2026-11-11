# Pooja Goel — Portfolio

Personal portfolio site. Database administration, reliability and security work,
AI enablement, plus the studio and tutoring sides.

Static React site, no backend. Every page renders from a single content file.

## Editing the content

Almost all copy lives in one place:

```txt
src/data/content.ts
```

Edit it, commit, push. The site rebuilds and redeploys itself.

Images and documents are plain files under `public/assets/`. Reference them
root-absolute — `/assets/images/portrait.webp` — and pass them through the
`asset()` helper in `src/lib/asset.ts` so they resolve onto the deployed base
path.

### Gaps waiting on content

Anything in `content.ts` written as `// TODO — …` is a deliberate gap. It
renders as a dashed orange box while running locally and is **hidden entirely in
the published build**, so an unfinished note can never reach the live site.
Replace the line with real copy and it becomes ordinary body text.

LinkedIn recommendations are the `recommendations` array, shown at the foot of
the Work page; the section renders nothing if the array is ever emptied. Quotes
go in as written — they are someone else's words, so trim with an ellipsis if
needed but do not paraphrase them.

### Page titles and descriptions

Each page's title and description live in their own small file:

```txt
src/data/pageMeta.json
```

They are apart from `content.ts` because the build reads them too. It stamps
them into a separate HTML file per route, which is what a search engine or a
link preview on LinkedIn, Slack or WhatsApp actually reads — neither runs the
site's JavaScript. A page's optional `social` line is used for the preview in
place of its description.

The preview image is `public/og-card.jpg`. To redraw it after changing the
headline or the portrait, run `python scripts/make-og-card.py` (needs Pillow,
and the Windows fonts it names) and commit the result.

## Design

A dark "production console": warm black, bone text, one signal orange, and a
status green used only for online and uptime marks. The colours are named
by role in `tailwind.config.js` — `paper` is the page, `ink` the text, `accent`
the orange — and their values are CSS variables in `src/index.css`, so a
palette change there reaches every component.

The Studio page is the exception: it inverts the scheme, black on a soft
orange instead of orange on black, because it is the one page that is not
about the engineering. The palette is still called `theme-light`. A page
opts in with `"theme": "light"` in `pageMeta.json`. The build stamps the
`theme-light` class into that page's own HTML file so a direct visit has
the right colours from the first paint, and `SiteLayout` keeps the class
right while moving between pages. Header, pager and footer follow the
palette too.

Four faces, all from Google Fonts: Anton for poster-size words (the name, page
titles, the footer), Space Grotesk for headings, Inter for reading, JetBrains
Mono for labels.

The database furniture lives in `src/components/Console.tsx`: the typed psql
query in the hero, the rotating ring of text, the stack marquee, the count-up
figures, the uptime strip and the Singapore clock. Each is decoration over
content that is also on the page as text, so each is hidden from screen
readers, and each holds still for anyone who has asked for reduced motion.

The route on the home page — India, Australia, Singapore as map pins on a
curving dotted line — is `src/components/RoutePins.tsx`. The flags are drawn there as
SVG rather than emoji, which Windows shows as bare letters. The pins are
decoration; the section keeps a visually hidden heading with the same names.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3100/.

To build exactly what gets deployed:

```bash
npm run build
```

Output lands in `dist/`. To preview it the way GitHub Pages serves it, from a
sub-path, pass the base explicitly:

```bash
GH_PAGES_BASE=/pooja-goel/ npm run build
```

On Windows in Git Bash, prefix that with `MSYS_NO_PATHCONV=1` — otherwise MSYS
rewrites the leading slash into a Windows path and the assets come out pointing
at `/Program Files/Git/pooja-goel/`. CI runs on Linux and is unaffected.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which builds the
site and publishes it to GitHub Pages. The workflow derives the base path from
the repository name and takes the public address from Pages itself, passing it
to the build as `SITE_URL`, so renaming or forking the repo needs no edit here.

`SITE_URL` is what the canonical links, the preview image and `sitemap.xml`
are built from, since all three need absolute URLs. A local build without it
simply leaves them out.

Pages must be set to **Settings → Pages → Source → GitHub Actions**. If it is
ever switched to "Deploy from a branch", Jekyll renders this README as the
homepage instead of the site.

## Layout

```txt
index.html             page shell and default meta tags
src/data/content.ts    all site copy
src/data/pageMeta.json title and description for each route
src/pages/             one file per route
src/components/        layout, navigation, shared pieces
src/components/Console the console furniture: terminal, marquee, counters
src/lib/asset.ts       base-path-aware asset URLs
public/assets/         images and downloadable documents
public/og-card.jpg     the image a shared link unfurls with
scripts/postbuild      per-route HTML, 404.html, sitemap, .nojekyll
scripts/make-og-card   redraws og-card.jpg; run by hand, not by the build
```

Routes are `/`, `/work`, `/ai-enablement`, `/experience` and `/studio`,
declared in `src/App.tsx`. Two former pages now live as sections, with their old
paths kept as redirects: `/tutoring` → `/studio#tutoring` and `/testimonials` →
`/work#recommendations`.

GitHub Pages has no SPA rewrite rule, so the build writes a real file for each
route — `work.html`, `studio.html` and so on — identical to `index.html` apart
from that page's own title and description. Pages serves `/work` from
`work.html`, so a deep link is an ordinary page. A new route needs an entry in
`pageMeta.json` to get its file.

`404.html` is a copy of `index.html` for everything else: the two redirect
paths above, and addresses that match nothing. The app boots from it and the
router either redirects or shows the not-found page.

## Product logos

Each capability card on the Experience page carries a strip of official product
logos in its header. The files are in `public/assets/logos/`, and which card
shows which is the `logos` array on each group in `content.ts`.

They are the vendors' own marks, from [Devicon] (MIT) — Databricks excepted,
which Devicon does not carry, so that one is the [Simple Icons] silhouette
painted the official brand red. The trademarks belong to their owners and are
used nominatively, to name tools that have actually been worked with. Neither
package is a dependency: the files were copied in and the packages removed.

Two things to know before adding more:

- **Serve them as files, not inlined SVG.** Several carry internal gradients
  under terse ids — SQL Server and PowerShell both define `id="a"` — which
  collide the moment two are inlined into one page.
- **Check for `xmlns`.** An SVG loaded through `<img>` is parsed as its own XML
  document, so a file missing the namespace renders as a broken image even
  though it would have been fine inlined. Devicon's Copilot mark ships without
  it.

The three cards that name practices rather than products — operations,
performance, security — deliberately carry no logos.

The Volunteering section groups its roles under each organisation's logo,
set in `volunteerOrgs` in `content.ts`. `unimelb.svg` is the University of
Melbourne's own mark, taken from its website. `stemsisters.png` is the
STEM Sisters emblem with its white background made transparent and the
"SISTERS" line cropped off, since that navy text all but vanishes on the
site's near-black and the name is printed beside the badge anyway. An
organisation with no `logo` falls back to its initials in a badge.

The history on the journey map carries logos too: `orgLogos` in
`content.ts`, keyed by each role's or qualification's `org` exactly as
written. `pointsbet.png` is PointsBet's own app icon from pointsbet.com.au,
`laddermedia.png` is the ladder cut from Ladder Media's header logo,
`srm.png` is the seal from SRM's logo on Wikipedia,
and the University of Melbourne reuses `unimelb.svg`. An organisation not
in that list shows no logo.

[Devicon]: https://devicon.dev
[Simple Icons]: https://simpleicons.org

## The journey map

The map that opens the Experience page is plain inline SVG. Its country
outlines live in `src/components/mapPaths.ts`, generated once from Natural
Earth 1:110m (via the `world-atlas` package) and projected with `d3-geo` into
a fixed 1280x709 frame. None of those packages is a dependency — the paths were
pasted in, so no projection runs in the browser. Coordinates are rounded to
whole pixels, which at this size is invisible and roughly halves the file.

The frame is a wide band, 27E to 195E and 38N to 46S, because the map runs the
full width of the page: India to Australia on its own is a tall, narrow region,
and widening the window fills that width with context countries rather than
stretching anything. Two things to know if you regenerate it. The window runs
past 180E, so the projection must be rotated onto its own centre or Mercator
clips it at the antimeridian. And the frame cannot be sized from a lat/lon
rectangle's projected bounds — d3 densifies polygon edges as great circles, so
the top edge bulges north; the scale is computed arithmetically instead.

Sizes inside the SVG are in viewBox units, so they shrink with the map. A phone
renders it at roughly a quarter scale, which is why the labels and markers have
much larger values below the `sm` breakpoint.

Singapore has no polygon at 1:110m, so it is drawn as a marker at its real
coordinates instead of a shape.

The component is lazy-loaded from `Experience.tsx`: the path data is about
12 kB gzipped and appears on no other route, so it is split into its own chunk
rather than riding in the bundle every page downloads. The `Suspense` fallback
reserves the map's aspect ratio so the page does not jump when the chunk lands.

What each place says is `journey` in `content.ts`. For India and Australia it
does not restate anything: it reads `roles` and `education`, filtered by their
`place`, so the map and the CV data cannot drift apart. `roles` is stored
newest-first, which is the order the map wants — the current role leads.
Singapore is the exception, with its own four entries, because it is about what
that market is working through rather than a history.

The map itself is `aria-hidden`: clicking a country works with a mouse, but
everything it does is reachable from the three buttons below it, so it does not
become a second set of tab stops saying the same thing.

## Images and documents

Source photographs are processed into web assets before being committed. Two
treatments matter and should survive any regeneration:

- **`hackathon.webp`** has the bystanders' faces feather-blurred. They did not
  consent to appearing on a public site.
- **`assets/documents/pooja-goel-resume.pdf`** has the phone number removed with
  a true PDF redaction, not a covering box — the text is gone, not hidden. If
  the résumé is ever replaced, redact it again before committing.

A studio band with no photographs yet carries `awaitsImages: true`, which keeps
a placeholder slot in the layout locally and an empty column on the live site.
Drop files into `public/assets/images/` and list them in the band's `images`
array to fill it.
