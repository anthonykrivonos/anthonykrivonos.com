import type { ReactNode } from "react";
import { siteData } from "../content.ts";
import { Link } from "./Link.tsx";

export interface ArticleMeta {
  /** ISO date, e.g. "2018-12-30". */
  published: string;
  modified?: string;
}

interface Props {
  /** Page <title>. The site name is appended unless this *is* the site name. */
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/blog/some-post". */
  path: string;
  css: string;
  /** Set on blog posts: drives the article meta tags and BlogPosting JSON-LD. */
  article?: ArticleMeta;
  /** Keeps a page out of search results. Used for 404. */
  noindex?: boolean;
  children: ReactNode;
}

const abs = (p: string) => new URL(p, siteData.url).href;

export function Layout({ title, description, path, css, article, noindex, children }: Props) {
  const fullTitle = title === siteData.name ? title : `${title} - ${siteData.name}`;
  const canonical = abs(path);
  const isHome = path === "/";
  const image = abs("/img/me.webp");

  const author = { "@type": "Person", name: siteData.name, url: siteData.url };

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: canonical,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        datePublished: article.published,
        dateModified: article.modified ?? article.published,
        author,
        publisher: author,
        image,
        inLanguage: "en",
      }
    : isHome
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteData.name,
          url: siteData.url,
          description,
          image,
          sameAs: siteData.links.map((l) => l.url),
        }
      : path === "/blog"
        ? {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${siteData.name} - Blog`,
            url: canonical,
            description,
            author,
            inLanguage: "en",
          }
        : null;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta
          name="robots"
          content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
        />
        <link rel="alternate" type="application/atom+xml" href="/feed.xml" title={siteData.name} />

        <meta property="og:type" content={article ? "article" : "website"} />
        <meta property="og:site_name" content={siteData.name} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={`${siteData.name} as a child, at a desktop computer in 2001`} />
        {article && <meta property="article:published_time" content={article.published} />}
        {article && <meta property="article:modified_time" content={article.modified ?? article.published} />}
        {article && <meta property="article:author" content={siteData.name} />}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <meta name="author" content={siteData.name} />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        {/* Inlined so every page is exactly one request. */}
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        {!isHome && (
          <nav>
            <a href="/">{siteData.name}</a>
            <a href="/blog">Blog</a>
          </nav>
        )}
        {children}
        <footer>
          {siteData.links.map((l) => (
            <Link key={l.url} href={l.url}>{l.title}</Link>
          ))}
        </footer>
      </body>
    </html>
  );
}
