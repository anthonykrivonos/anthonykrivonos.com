import type { Post as PostType } from "../content.ts";
import { siteData, formatDate, isoDate } from "../content.ts";

/** Title, byline, date -- the heading order the reference's essay pages use. */
export function Post({ post }: { post: PostType }) {
  const { Body } = post;
  return (
    <>
      <h1>{post.title}</h1>
      <h2>{siteData.name}</h2>
      <h3><time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time></h3>
      <Body />
    </>
  );
}
