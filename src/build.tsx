/**
 * Static site generator. React is used purely as a build-time template engine:
 * every route is rendered with renderToStaticMarkup and written to disk. There
 * is no Bun.build() call and no browser bundle -- the output ships zero JS.
 */
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { rm, cp, mkdir } from "node:fs/promises";
import mdx from "./mdx-plugin.ts";

Bun.plugin(mdx); // register the .md loader in Bun's runtime resolver

const { loadPosts, loadHome, siteData, isoDate } = await import("./content.ts");
const { Layout } = await import("./components/Layout.tsx");
type ArticleMeta = import("./components/Layout.tsx").ArticleMeta;
const { Home } = await import("./pages/Home.tsx");
const { BlogIndex } = await import("./pages/BlogIndex.tsx");
const { Post } = await import("./pages/Post.tsx");
const { NotFound } = await import("./pages/NotFound.tsx");

const DIST = "dist";
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const css = await Bun.file("src/style.css").text();
const posts = await loadPosts();
const home = await loadHome();

const written: string[] = [];
/** Every indexable page adds itself here as it is written; sitemap.xml is built from it. */
const sitemap: { loc: string; lastmod: Date }[] = [];

interface PageOpts {
  article?: ArticleMeta;
  noindex?: boolean;
  /** When the page's content last changed. Required unless noindex. */
  lastmod?: Date;
}

async function writePage(
  path: string,
  title: string,
  description: string,
  node: ReactNode,
  opts: PageOpts = {},
) {
  const html = renderToStaticMarkup(
    <Layout
      title={title}
      description={description}
      path={path}
      css={css}
      article={opts.article}
      noindex={opts.noindex}
    >
      {node}
    </Layout>,
  );
  // "/" -> dist/index.html, "/blog" -> dist/blog/index.html
  const file = path === "/404" ? `${DIST}/404.html`
    : path === "/" ? `${DIST}/index.html`
    : `${DIST}${path}/index.html`;
  await Bun.write(file, `<!doctype html>\n${html}\n`);
  written.push(file);
  if (!opts.noindex) {
    if (!opts.lastmod) throw new Error(`${path}: indexable page needs a lastmod`);
    sitemap.push({ loc: new URL(path, siteData.url).href, lastmod: opts.lastmod });
  }
}

const newest = (...ds: (Date | undefined)[]) =>
  new Date(Math.max(...ds.filter((d): d is Date => !!d).map((d) => d.getTime())));
const postModified = (p: (typeof posts)[number]) => p.updated ?? p.date;
// The home page and the index list every post, so a new or edited post changes them too.
const latestPost = newest(...posts.map(postModified));

await writePage("/", siteData.name, siteData.description, <Home Body={home.Body} posts={posts} />, {
  lastmod: newest(home.updated, latestPost),
});
await writePage("/blog", "Blog", `Writing by ${siteData.name}.`, <BlogIndex posts={posts} />, {
  lastmod: latestPost,
});
for (const post of posts) {
  await writePage(`/blog/${post.slug}`, post.title, post.summary, <Post post={post} />, {
    article: {
      published: isoDate(post.date),
      modified: post.updated && isoDate(post.updated),
    },
    lastmod: postModified(post),
  });
}
await writePage("/404", "Not found", "That page does not exist.", <NotFound />, { noindex: true });

// Static assets
await cp("public", DIST, { recursive: true });

// robots.txt + sitemap.xml + Atom feed

await Bun.write(`${DIST}/robots.txt`,
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", siteData.url).href}\n`);

await Bun.write(`${DIST}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemap
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${isoDate(u.lastmod)}</lastmod></url>`)
    .join("\n") +
  `\n</urlset>\n`);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
await Bun.write(`${DIST}/feed.xml`,
  `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n` +
  `  <title>${esc(siteData.name)}</title>\n` +
  `  <link href="${siteData.url}"/>\n` +
  `  <link rel="self" href="${new URL("/feed.xml", siteData.url).href}"/>\n` +
  `  <id>${siteData.url}/</id>\n` +
  `  <updated>${latestPost.toISOString()}</updated>\n` +
  `  <author><name>${esc(siteData.name)}</name></author>\n` +
  posts.map((p) => {
    const href = new URL(`/blog/${p.slug}`, siteData.url).href;
    return `  <entry>\n    <title>${esc(p.title)}</title>\n    <link href="${href}"/>\n` +
      `    <id>${href}</id>\n    <updated>${postModified(p).toISOString()}</updated>\n` +
      `    <summary>${esc(p.summary)}</summary>\n  </entry>`;
  }).join("\n") +
  `\n</feed>\n`);

for (const f of written) {
  console.log(`  ${f}  ${((await Bun.file(f).size) / 1024).toFixed(1)} KB`);
}
const n = posts.length;
console.log(`\n${written.length} pages, ${n} post${n === 1 ? "" : "s"}, latest ${isoDate(posts[0]!.date)}`);
