import type { Body, Post } from "../content.ts";
import { formatDate, isoDate } from "../content.ts";

export function Home({ Body, posts }: { Body: Body; posts: Post[] }) {
  return (
    <>
      <Body />
      <h2>Writing</h2>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <time className="date" dateTime={isoDate(p.date)}>{formatDate(p.date)}</time>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
