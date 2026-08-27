import type { Post as PostType } from "../content.ts";
import { siteData, formatDate, isoDate } from "../content.ts";

/** Mirrors the reference's essay pages: h1 title, h2 author, h3 date. */
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
