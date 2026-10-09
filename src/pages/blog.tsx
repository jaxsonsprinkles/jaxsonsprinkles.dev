import { RiArrowRightLine } from "@remixicon/react";
import { Layout } from "@/components/site/layout";
import { posts } from "@/content/posts";

export function BlogPage() {
  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Writing</h1>
        <p className="page-sub">Thoughts on building, learning, and whatever else is on my mind.</p>
      </div>

      <div className="row-list">
        {posts.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}.html`} className="blog-post-row">
            <div className="row-date">{p.shortDate}</div>
            <div className="row-title">{p.title}</div>
            <RiArrowRightLine className="row-arrow size-4" aria-hidden />
          </a>
        ))}
      </div>
    </Layout>
  );
}
