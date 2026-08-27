import type { Body, Post } from "../content.ts";
import { siteData, shortDate, isoDate } from "../content.ts";
import { Link, mdxComponents } from "../components/Link.tsx";

export function Home({ Body, posts }: { Body: Body; posts: Post[] }) {
  const news = [...siteData.news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <h2>{siteData.name}</h2>
      <Body components={mdxComponents} />

      <h3>Writing</h3>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
            <time className="date" dateTime={isoDate(p.date)}>{shortDate(p.date)}</time>
          </li>
        ))}
      </ul>

      {news.length > 0 && (
        <>
          <h3>News</h3>
          <ul className="posts">
            {news.map((n) => (
              <li key={n.url}>
                <Link href={n.url}>{n.title}</Link>
                <span className="date">
                  {n.outlet}, <time dateTime={n.date}>{shortDate(new Date(`${n.date}T00:00:00Z`))}</time>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
