import type { Body, Post } from "../content.ts";
import { siteData, shortDate, isoDate } from "../content.ts";

export function Home({ Body, posts }: { Body: Body; posts: Post[] }) {
  return (
    <>
      <h2>{siteData.name}</h2>
      <Body />
      <h3>Writing</h3>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
            <time className="date" dateTime={isoDate(p.date)}>{shortDate(p.date)}</time>
          </li>
        ))}
      </ul>
    </>
  );
}
