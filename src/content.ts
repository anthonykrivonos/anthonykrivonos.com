import type { ComponentType } from "react";
import { parse as parseYaml } from "yaml";
import site from "../data/site.json" with { type: "json" };

export type Body = ComponentType<{ components?: Record<string, unknown> }>;

export interface Post {
  slug: string;
  title: string;
  /** Parsed from the `date` frontmatter field. */
  date: Date;
  summary: string;
  Body: Body;
}

export interface NewsItem {
  /** The headline as published, so the link is a faithful citation. */
  title: string;
  outlet: string;
  url: string;
  /** ISO date; the list is rendered newest first. */
  date: string;
}

export interface Site {
  name: string;
  url: string;
  description: string;
  links: { title: string; url: string }[];
  news: NewsItem[];
}

export const siteData: Site = site;

/** Reads the raw frontmatter block so we can validate before trusting it. */
async function rawFrontmatter(path: string): Promise<Record<string, unknown>> {
  const raw = await Bun.file(path).text();
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error(`${path}: missing frontmatter block`);
  return (parseYaml(m[1]!) ?? {}) as Record<string, unknown>;
}

function require_(fm: Record<string, unknown>, path: string, field: string): string {
  const v = fm[field];
  if (typeof v !== "string" || v.trim() === "") {
    throw new Error(`${path}: frontmatter field "${field}" must be a non-empty string`);
  }
  return v;
}

export async function loadPosts(): Promise<Post[]> {
  const paths = [...new Bun.Glob("content/blog/*.md").scanSync()].sort();
  if (paths.length === 0) throw new Error("no posts found in content/blog");

  const posts = await Promise.all(
    paths.map(async (path) => {
      const fm = await rawFrontmatter(path);
      const title = require_(fm, path, "title");
      const summary = require_(fm, path, "summary");

      // YAML parses an unquoted ISO date into a Date already; a quoted one stays a string.
      const rawDate = fm.date;
      const date = rawDate instanceof Date ? rawDate : new Date(String(rawDate));
      if (Number.isNaN(date.getTime())) {
        throw new Error(`${path}: frontmatter field "date" is not a valid date`);
      }

      const mod = (await import(`${process.cwd()}/${path}`)) as { default: Body };
      const slug = path.replace(/^content\/blog\//, "").replace(/\.md$/, "");
      return { slug, title, date, summary, Body: mod.default };
    }),
  );

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function loadHome(): Promise<{ title: string; Body: Body }> {
  const path = "content/home.md";
  const fm = await rawFrontmatter(path);
  const mod = (await import(`${process.cwd()}/${path}`)) as { default: Body };
  return { title: require_(fm, path, "title"), Body: mod.default };
}

/** "December 30, 2018" -- built from UTC parts so the output never shifts with TZ. */
export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** "2018-12-30" for <time datetime> and sitemap/feed timestamps. */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** "12/30/18" -- the compact form the writing list uses. */
export function shortDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  });
}
