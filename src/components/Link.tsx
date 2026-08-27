import type { AnchorHTMLAttributes } from "react";
import { siteData } from "../content.ts";

const siteHost = new URL(siteData.url).hostname.replace(/^www\./, "");

/**
 * True when a link should open in a new tab.
 *
 * Anything on another origin does. Same-origin links stay in this tab only if
 * they point at another page of the site; a same-origin *file* (an image, a
 * PDF) is not "another page", so it opens in a new tab too. In-page anchors
 * and mailto:/tel: links are left alone.
 */
export function opensInNewTab(href: string): boolean {
  if (!href || href.startsWith("#")) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !/^https?:/i.test(href)) return false;

  let url: URL;
  try {
    url = new URL(href, siteData.url);
  } catch {
    return false;
  }

  if (url.hostname.replace(/^www\./, "") !== siteHost) return true;

  const last = url.pathname.split("/").pop() ?? "";
  return last.includes(".");
}

/** An <a> that adds target/rel when the destination leaves the site. */
export function Link({ href = "", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const newTab = opensInNewTab(href);
  return <a href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest} />;
}

/** Passed to every rendered markdown body so links in prose follow the same rule. */
export const mdxComponents = { a: Link };
