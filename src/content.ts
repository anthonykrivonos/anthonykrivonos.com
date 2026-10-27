import type { ComponentType } from "react";
import { parse as parseYaml } from "yaml";
import site from "../data/site.json" with { type: "json" };

export type Body = ComponentType<{ components?: Record<string, unknown> }>;

export interface Post {
  slug: string;
  title: string;
  /** Parsed from the `date` frontmatter field. */
  date: Date;
  /** Optional `updated` frontmatter field: the last substantive edit. */
  updated?: Date;
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
  /** Structured data only: Person.jobTitle and Person.worksFor. */
  jobTitle: string;
  worksFor: { name: string; url: string };
  /** Profiles listed in Person.sameAs but not in the footer. */
  profiles: string[];
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

function dateField(
  fm: Record<string, unknown>,
  path: string,
  field: string,
  optional = false,
): Date | undefined {
  const raw = fm[field];
  if (raw === undefined && optional) return undefined;
  // YAML parses an unquoted ISO date into a Date already; a quoted one stays a string.
  const d = raw instanceof Date ? raw : new Date(String(raw));
  if (Number.isNaN(d.getTime())) {
    throw new Error(`${path}: frontmatter field "${field}" is not a valid date`);
  }
  return d;
}

export async function loadPosts(): Promise<Post[]> {
  const paths = [...new Bun.Glob("content/blog/*.md").scanSync()].sort();
  if (paths.length === 0) throw new Error("no posts found in content/blog");

  const posts = await Promise.all(
    paths.map(async (path) => {
      const fm = await rawFrontmatter(path);
      const title = require_(fm, path, "title");
      const summary = require_(fm, path, "summary");

      const date = dateField(fm, path, "date")!;
      const updated = dateField(fm, path, "updated", true);

      const mod = (await import(`${process.cwd()}/${path}`)) as { default: Body };
      const slug = path.replace(/^content\/blog\//, "").replace(/\.md$/, "");
      return { slug, title, date, updated, summary, Body: mod.default };
    }),
  );

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function loadHome(): Promise<{ title: string; updated?: Date; Body: Body }> {
  const path = "content/home.md";
  const fm = await rawFrontmatter(path);
  const mod = (await import(`${process.cwd()}/${path}`)) as { default: Body };
  return {
    title: require_(fm, path, "title"),
    updated: dateField(fm, path, "updated", true),
    Body: mod.default,
  };
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
