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
renders as a dashed pink box while running locally and is **hidden entirely in
the published build**, so an unfinished note can never reach the live site.
Replace the line with real copy and it becomes ordinary body text.

LinkedIn recommendations work the same way: the section at the foot of the Work
page renders nothing while the `recommendations` array is empty. Paste quotes
as written — they are someone else's words, so do not paraphrase them.

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
the repository name, so renaming or forking the repo needs no edit here.

Pages must be set to **Settings → Pages → Source → GitHub Actions**. If it is
ever switched to "Deploy from a branch", Jekyll renders this README as the
homepage instead of the site.

## Layout

```txt
index.html          page shell and meta tags
src/data/content.ts all site copy
src/pages/          one file per route
src/components/     layout, navigation, shared pieces
src/lib/asset.ts    base-path-aware asset URLs
public/assets/      images and downloadable documents
scripts/postbuild   404.html and .nojekyll for Pages
```

Routes are `/`, `/work`, `/ai-enablement`, `/experience` and `/studio`,
declared in `src/App.tsx`. Two former pages now live as sections, with their old
paths kept as redirects: `/tutoring` → `/studio#tutoring` and `/testimonials` →
`/work#recommendations`.

`404.html` is a copy of `index.html`. GitHub Pages has no SPA rewrite rule, so a
deep link such as `/work` requests a file that does not exist and Pages serves
`404.html`; the app boots from it and the router renders the real route.

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

[Devicon]: https://devicon.dev
[Simple Icons]: https://simpleicons.org

## The journey map

The map at the foot of the Experience page is plain inline SVG. Its country
outlines live in `src/components/mapPaths.ts`, generated once from Natural
Earth 1:110m (via the `world-atlas` package) and projected with `d3-geo` into
a fixed 760x560 frame. None of those packages is a dependency — the paths were
pasted in, so no projection runs in the browser. Coordinates are rounded to
whole pixels, which at this size is invisible and roughly halves the file.

Singapore has no polygon at 1:110m, so it is drawn as a marker at its real
coordinates instead of a shape.

The component is lazy-loaded from `Experience.tsx`: the path data is about
12 kB gzipped and appears on no other route, so it is split into its own chunk
rather than riding in the bundle every page downloads. The `Suspense` fallback
reserves the map's aspect ratio so the page does not jump when the chunk lands.

What each place says is `journey` in `content.ts`. The map itself is
`aria-hidden`: clicking a country works with a mouse, but everything it does is
reachable from the three buttons beside it, so it does not become a second set
of tab stops saying the same thing.

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
