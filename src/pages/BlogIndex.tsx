import type { Post } from "../content.ts";
import { shortDate, isoDate } from "../content.ts";

export function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <>
      <h2>Writing</h2>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
            <time className="date" dateTime={isoDate(p.date)}>{shortDate(p.date)}</time>
            <span className="summary">{p.summary}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
