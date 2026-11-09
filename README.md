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

The testimonials page works the same way: while the `testimonials` array is
empty the page stays out of the navigation. Add a quote and it appears.

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

Routes are `/`, `/work`, `/ai-enablement`, `/experience`, `/studio`,
`/tutoring` and `/testimonials`, declared in `src/App.tsx`.

`404.html` is a copy of `index.html`. GitHub Pages has no SPA rewrite rule, so a
deep link such as `/work` requests a file that does not exist and Pages serves
`404.html`; the app boots from it and the router renders the real route.

## Images

Source photographs are processed into web assets before being committed. The
speaking photograph has the bystanders' faces deliberately blurred, since they
did not consent to appearing on a public site — keep that treatment if the
image is ever regenerated.
