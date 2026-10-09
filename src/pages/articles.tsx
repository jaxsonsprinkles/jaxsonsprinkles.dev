import { LinkedInArticleBody } from "@/content/linkedin";

export function ArticlesPage() {
  return (
    <div className="articles-wrap">
      <h1>Articles</h1>
      <ul className="article-list">
        <li>
          <a href="/articles/linkedin-profile.html">How to Build a 10/10 LinkedIn Profile</a>
        </li>
      </ul>
    </div>
  );
}

export function LinkedInArticlePage() {
  return (
    <div className="article-wrap">
      <h1>How to Build a 10/10 LinkedIn Profile</h1>
      <LinkedInArticleBody />
    </div>
  );
}
