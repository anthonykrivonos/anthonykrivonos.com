import type { BunPlugin } from "bun";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";

/**
 * Bun plugin: compiles `.md` into React components. Each module exports the
 * content component (default) and a `frontmatter` object.
 *
 * Registered at runtime via `Bun.plugin(mdx)` in build.ts, not as a bundler
 * plugin -- nothing here is bundled for a browser. The compiled components are
 * imported by the build script and rendered to static HTML.
 *
 * No rehype-highlight: neither article contains a fenced code block, so the
 * dependency would ship a highlighter for nothing.
 */
const mdxPlugin: BunPlugin = {
  name: "mdx",
  setup(build) {
    build.onLoad({ filter: /\.mdx?$/ }, async (args) => {
      const source = await Bun.file(args.path).text();
      const compiled = await compile(source, {
        jsxImportSource: "react",
        outputFormat: "program",
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [rehypeSlug],
      });
      return { contents: String(compiled), loader: "js" };
    });
  },
};

export default mdxPlugin;
