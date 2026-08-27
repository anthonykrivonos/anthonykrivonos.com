import type { ReactNode } from "react";
import { siteData } from "../content.ts";

interface Props {
  /** Page <title>. The site name is appended unless this *is* the site name. */
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/blog/some-post". */
  path: string;
  css: string;
  children: ReactNode;
}

export function Layout({ title, description, path, css, children }: Props) {
  const fullTitle = title === siteData.name ? title : `${title} - ${siteData.name}`;
  const canonical = new URL(path, siteData.url).href;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="alternate" type="application/atom+xml" href="/feed.xml" title={siteData.name} />
        <meta property="og:type" content={path.startsWith("/blog/") ? "article" : "website"} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        {/* Inlined so every page is exactly one request. */}
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <nav>
          <ul>
            <li><a className="name" href="/">{siteData.name}</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </nav>
        <main>{children}</main>
        <footer>
          <ul>
            {siteData.links.map((l) => (
              <li key={l.url}><a href={l.url}>{l.title}</a></li>
            ))}
          </ul>
        </footer>
      </body>
    </html>
  );
}
