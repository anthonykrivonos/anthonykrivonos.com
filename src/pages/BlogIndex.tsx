import type { Post } from "../content.ts";
import { formatDate, isoDate } from "../content.ts";

export function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <>
      <h1>Blog</h1>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <time className="date" dateTime={isoDate(p.date)}>{formatDate(p.date)}</time>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
            <div className="summary">{p.summary}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
