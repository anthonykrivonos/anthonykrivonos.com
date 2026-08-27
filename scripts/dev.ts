/**
 * Dev server: rebuild, serve dist/, and rebuild again whenever content or src
 * changes. Mirrors Vercel's resolution order (exact file, then <path>/index.html,
 * then 404) so local behaviour matches production.
 */
import { watch } from "node:fs";
import { file } from "bun";

const PORT = 4173;
let building = false;
let queued = false;

async function build() {
  if (building) { queued = true; return; }
  building = true;
  try {
    const proc = Bun.spawn(["bun", "src/build.tsx"], { stdout: "pipe", stderr: "pipe" });
    const code = await proc.exited;
    if (code !== 0) console.error(await new Response(proc.stderr).text());
    else console.log(`built ${new Date().toLocaleTimeString()}`);
  } finally {
    building = false;
    if (queued) { queued = false; await build(); }
  }
}

await build();

for (const dir of ["content", "src", "data", "public"]) {
  watch(dir, { recursive: true }, () => { void build(); });
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const clean = pathname.replace(/\/+$/, "") || "/";
    for (const candidate of [`dist${pathname}`, `dist${clean}/index.html`, `dist${clean}.html`]) {
      const f = file(candidate);
      if (await f.exists() && (await f.stat()).isFile()) {
        return new Response(f);
      }
    }
    return new Response(file("dist/404.html"), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`http://localhost:${PORT}`);
