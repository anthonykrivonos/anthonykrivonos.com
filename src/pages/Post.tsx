import type { Post as PostType } from "../content.ts";
import { siteData, formatDate, isoDate } from "../content.ts";
import { mdxComponents } from "../components/Link.tsx";

/**
 * Title, then a byline. The byline is a <p>, not headings: an author name and
 * a date are not sections of the document, and as h2/h3 they competed with the
 * article's own h2 section headings in the outline.
 */
export function Post({ post }: { post: PostType }) {
  const { Body } = post;
  return (
    <article>
      <h1>{post.title}</h1>
      <p className="byline">
        {siteData.name}
        <br />
        <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time>
      </p>
      <Body components={mdxComponents} />
    </article>
  );
}
