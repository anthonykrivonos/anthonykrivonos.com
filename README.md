# anthonykrivonos.com

A static personal site. Markdown in, plain HTML out, zero client-side JavaScript.

## How it works

React is used only as a build-time template engine. `src/build.tsx` compiles the
markdown in `content/` to React components, renders each route with
`renderToStaticMarkup`, and writes plain HTML to `dist/`. There is no
`Bun.build()` call and no browser bundle, so nothing ships to the client. The
stylesheet is inlined into each page, which means every page is exactly one
HTTP request.

```
content/home.md            the bio on the home page
content/blog/<slug>.md     one file per post; filename is the URL slug
data/site.json             name, canonical URL, footer links
public/                    static assets, copied verbatim into dist/
src/build.tsx              the generator
src/mdx-plugin.ts          compiles .md into React components
src/content.ts             discovery + frontmatter validation
src/style.css              the whole design
```

## Writing a post

Add a file to `content/blog/`. The filename becomes the URL. All three
frontmatter fields are required and the build fails without them:

```markdown
---
title: The Title
date: 2026-01-30
summary: One sentence, shown on the blog index.
---

Body goes here.
```

Add `updated: 2026-02-14` after a substantive edit. It sets the post's
modified date in the sitemap, the feed and its structured data. `content/home.md`
takes the same field. The sitemap is built from the pages the build writes, so a
new post or page is listed without touching anything else.

Images live in `public/img/` and are referenced as `/img/name.webp`.

## Commands

```sh
bun install
bun run dev        # http://localhost:4173, rebuilds on change
bun run build      # -> dist/
bun run typecheck
```

## Deploying

Vercel, configured by `vercel.json`: `bun install`, `bun run build`, publish
`dist`. Old `/article/*` URLs redirect to `/blog`.

The canonical host is `www`, and `url` in `data/site.json` must match it. The
apex domain is attached to the project with no domain-level redirect, so that
`vercel.json` can send `anthonykrivonos.com/<path>` straight to its final `www`
URL in one hop.
