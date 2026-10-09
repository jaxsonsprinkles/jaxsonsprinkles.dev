import { RiArrowLeftLine } from "@remixicon/react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/base/buttons/button";
import { Layout } from "@/components/site/layout";
import { BuildPostBody } from "@/content/build";
import { EmailPostBody } from "@/content/email";
import { posts } from "@/content/posts";

function Post({ slug, children }: { slug: string; children: ReactNode }) {
  const post = posts.find((p) => p.slug === slug)!;
  return (
    <Layout>
      <ButtonLink href="/blog.html" variant="ghost" size="small" leadingIcon={RiArrowLeftLine} className="blog-back">
        All posts
      </ButtonLink>

      <div className="blog-entry-header">
        <div className="blog-entry-date">{post.date}</div>
        <h1 className="blog-entry-title">{post.title}</h1>
        {post.sub && <p className="blog-entry-sub">{post.sub}</p>}
      </div>

      <div className="blog-entry-body">{children}</div>
    </Layout>
  );
}

export const BuildPostPage = () => (
  <Post slug="if-you-build-it-they-will-not-come">
    <BuildPostBody />
  </Post>
);

export const EmailPostPage = () => (
  <Post slug="you-can-just-email-people">
    <EmailPostBody />
  </Post>
);
