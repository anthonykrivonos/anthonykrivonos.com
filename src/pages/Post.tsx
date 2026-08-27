import type { Post as PostType } from "../content.ts";
import { formatDate, isoDate } from "../content.ts";

export function Post({ post }: { post: PostType }) {
  const { Body } = post;
  return (
    <article>
      <h1>{post.title}</h1>
      <p className="meta">
        <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time>
      </p>
      <Body />
    </article>
  );
}
