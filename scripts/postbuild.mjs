/**
 * Post-build steps for GitHub Pages.
 *
 * 1. `404.html` is a copy of `index.html`. Pages has no SPA rewrite rule, so a
 *    deep link such as /work requests a file that does not exist; Pages serves
 *    404.html, the app boots from it and the router renders the real route.
 * 2. `.nojekyll` stops Pages running the output through Jekyll, which would
 *    otherwise drop files and folders beginning with an underscore.
 */

import { copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");

await copyFile(resolve(dist, "index.html"), resolve(dist, "404.html"));
await writeFile(resolve(dist, ".nojekyll"), "");

console.log("postbuild: wrote 404.html and .nojekyll");
