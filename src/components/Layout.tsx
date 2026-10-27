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
  const imageAlt = `${siteData.name} as a child, at a desktop computer in 2001`;

  // One @graph per page. The site and the person are described on every page
  // under stable @ids, so each page's own node can point at them by reference
  // and search engines merge them into a single entity.
  const home = abs("/");
  const person = { "@id": `${home}#person` };
  const website = { "@id": `${home}#website` };
  const blog = { "@id": `${abs("/blog")}#blog` };

  const crumbs = (items: [string, string][]) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, p], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(p),
    })),
  });

  const pageNodes: object[] = article
    ? [
        {
          "@type": "BlogPosting",
          "@id": `${canonical}#article`,
          headline: title,
          description,
          url: canonical,
          mainEntityOfPage: canonical,
          datePublished: article.published,
          dateModified: article.modified ?? article.published,
          author: person,
          publisher: person,
          isPartOf: blog,
          image,
          inLanguage: "en",
        },
        crumbs([[siteData.name, "/"], ["Blog", "/blog"], [title, path]]),
      ]
    : isHome
      ? [
          {
            "@type": "ProfilePage",
            "@id": canonical,
            url: canonical,
            name: fullTitle,
            description,
            mainEntity: person,
            isPartOf: website,
            inLanguage: "en",
          },
        ]
      : path === "/blog"
        ? [
            {
              "@type": "Blog",
              "@id": blog["@id"],
              name: `${siteData.name} - Blog`,
              url: canonical,
              description,
              author: person,
              publisher: person,
              isPartOf: website,
              inLanguage: "en",
            },
            crumbs([[siteData.name, "/"], ["Blog", "/blog"]]),
          ]
        : [];

  const jsonLd = noindex ? null : {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        ...website,
        name: siteData.name,
        url: home,
        publisher: person,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        ...person,
        name: siteData.name,
        url: home,
        image: { "@type": "ImageObject", url: image, width: 600, height: 600, caption: imageAlt },
        jobTitle: siteData.jobTitle,
        worksFor: { "@type": "Organization", ...siteData.worksFor },
        sameAs: [...siteData.links.map((l) => l.url), ...siteData.profiles],
      },
      ...pageNodes,
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {!noindex && <link rel="canonical" href={canonical} />}
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
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={imageAlt} />
        {article && <meta property="article:published_time" content={article.published} />}
        {article && <meta property="article:modified_time" content={article.modified ?? article.published} />}
        {article && <meta property="article:author" content={siteData.name} />}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={imageAlt} />

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
            // rel="me" ties these profiles to this site as the same person.
            <Link key={l.url} href={l.url} rel="me noopener noreferrer">{l.title}</Link>
          ))}
        </footer>
      </body>
    </html>
  );
}
