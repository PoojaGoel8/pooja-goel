/**
 * Resolves a root-absolute asset path onto the deployed base path.
 *
 * Vite rewrites `/assets/...` references it finds in HTML and CSS, but not
 * ones held in TypeScript strings — so content-file image paths come through
 * here. On GitHub Pages BASE_URL is `/<repo>/`; locally it is `/`.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
