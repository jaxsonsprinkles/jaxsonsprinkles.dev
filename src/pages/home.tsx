import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";
import { Layout } from "@/components/site/layout";
import { SectionLabel } from "@/components/site/section-label";
import { GithubGraph } from "@/components/site/github-graph";
import { Hint } from "@/components/site/hint";
import { LinkButton } from "@/components/base/buttons/link-button";
import { posts } from "@/content/posts";

const devicon = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-original.svg`;
const simple = (n: string, color: string) => `https://cdn.simpleicons.org/${n}/${color}`;

const stack = [
  { name: "JavaScript", src: devicon("javascript") },
  { name: "TypeScript", src: devicon("typescript") },
  { name: "Python", src: devicon("python") },
  { name: "React", src: devicon("react") },
  { name: "Next.js", src: devicon("nextjs") },
  { name: "Tailwind CSS", src: devicon("tailwindcss") },
  { name: "shadcn/ui", src: simple("shadcnui", "111110") },
  { name: "Git", src: devicon("git") },
  { name: "GitHub", src: simple("github", "111110") },
  { name: "Node.js", src: devicon("nodejs") },
  { name: "Claude Code", src: simple("claude", "E8631A") },
  { name: "Convex", src: simple("convex", "111110") },
  { name: "PyTorch", src: devicon("pytorch") },
  { name: "NumPy", src: devicon("numpy") },
];

const work = [
  { name: "Mochi", href: "https://mochitext.com", domain: "mochitext.com", desc: "Calorie tracking via iMessage — text a meal, get instant logging" },
  { name: "Forge", href: "https://github.com/jaxsonsprinkles/forge", domain: "github.com", desc: "Self-improving AI agent framework — agents that rewrite and test their own code" },
  { name: "Avian", href: "https://avian.sh", domain: "avian.sh", desc: "AI outreach research — turn any name into a conversation" },
  { name: "Fluent", href: "https://speakfluent.coach", domain: "speakfluent.coach", desc: "AI filler word detection and speech coaching" },
  { name: "RepoAI", href: "https://getrepoai.vercel.app", domain: "getrepoai.vercel.app", desc: "Understand any GitHub repo in seconds with AI" },
];

function Footer() {
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <footer className="px-0 pt-8 pb-6 text-center text-caption-1-medium text-text-tertiary">
      <dotlottie-wc src="/signature.json" className="signature" autoplay={animate} loop={animate} speed="1.5" />
      design inspired by{" "}
      <LinkButton href="https://tanvir.io" target="_blank" rel="noopener noreferrer" variant="secondary" size="xs" className="underline">
        tanvir.io
      </LinkButton>
    </footer>
  );
}

export function HomePage() {
  return (
    <Layout footer={<Footer />}>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <h1 className="hero-name">Jaxson Sprinkles</h1>
            <p className="hero-bio">High school developer building at the intersection of AI and human behavior.</p>
          </div>
          <div className="hero-photo">
            <img src="/IMG_0730.JPG" alt="Jaxson Sprinkles" />
          </div>
        </div>
      </section>

      <section>
        <SectionLabel first>Stack</SectionLabel>
        <div className="stack-marquee-wrap">
          <div className="stack-marquee-track">
            {[0, 1].flatMap((copy) =>
              stack.map((s) => (
                <Hint key={`${copy}-${s.name}`} label={s.name}>
                  <img className="stack-logo" src={s.src} alt={copy === 0 ? s.name : ""} aria-hidden={copy === 1} />
                </Hint>
              )),
            )}
          </div>
        </div>
      </section>

      <section>
        <SectionLabel more={{ href: "/projects.html", label: "all projects" }}>Work</SectionLabel>
        <div className="row-list">
          {work.map((w) => (
            <a key={w.name} href={w.href} target="_blank" rel="noopener noreferrer" className="work-item">
              <img
                className="work-favicon"
                src={`https://www.google.com/s2/favicons?domain=${w.domain}&sz=32`}
                alt=""
                aria-hidden
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="work-name">{w.name}</span>
              <span className="work-desc">{w.desc}</span>
              <RiArrowRightUpLine className="row-arrow size-4" aria-hidden />
            </a>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Activity</SectionLabel>
        <div className="gh-chart-wrap">
          <GithubGraph />
        </div>
      </section>

      <section>
        <SectionLabel more={{ href: "/blog.html", label: "all posts" }}>Writing</SectionLabel>
        <div className="row-list">
          {posts.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}.html`} className="writing-item">
              <span className="row-date">{p.shortDate}</span>
              <span className="row-title">{p.title}</span>
              <RiArrowRightLine className="row-arrow size-4" aria-hidden />
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}
