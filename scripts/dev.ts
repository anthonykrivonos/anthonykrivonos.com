/**
 * Dev server: build, serve dist/, rebuild on change. Resolution order mirrors
 * Vercel's (exact file, then <path>/index.html, then 404) so local matches prod.
 */
import { watch } from "node:fs";
import { file } from "bun";

const PORT = 4173;

let building: Promise<void> | null = null;
let rerun = false;
/** Copying public/ into dist/ makes the watcher fire on public/img, which would
 *  retrigger the build forever. Ignore events raised while a build is running
 *  and for a moment after it settles. */
let settleUntil = 0;

async function runBuild() {
  const proc = Bun.spawn(["bun", "src/build.tsx"], { stdout: "pipe", stderr: "pipe" });
  const code = await proc.exited;
  if (code !== 0) console.error(await new Response(proc.stderr).text());
  else console.log(`built ${new Date().toLocaleTimeString()}`);
}

function build(): Promise<void> {
  if (building) { rerun = true; return building; }
  building = (async () => {
    do {
      rerun = false;
      await runBuild();
    } while (rerun);
  })().finally(() => {
    building = null;
    settleUntil = Date.now() + 500;
  });
  return building;
}

await build();

let debounce: ReturnType<typeof setTimeout> | undefined;
for (const dir of ["content", "src", "data", "public"]) {
  watch(dir, { recursive: true }, () => {
    if (building || Date.now() < settleUntil) return;
    clearTimeout(debounce);
    debounce = setTimeout(() => void build(), 120);
  });
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    if (building) await building; // don't serve a half-written dist/
    const { pathname } = new URL(req.url);
    const clean = pathname.replace(/\/+$/, "") || "/";
    for (const candidate of [`dist${pathname}`, `dist${clean}/index.html`, `dist${clean}.html`]) {
      const f = file(candidate);
      if ((await f.exists()) && (await f.stat()).isFile()) return new Response(f);
    }
    return new Response(file("dist/404.html"), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`http://localhost:${PORT}`);
