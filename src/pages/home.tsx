import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";
import { Layout } from "@/components/site/layout";
import { SectionLabel } from "@/components/site/section-label";
import { GithubGraph } from "@/components/site/github-graph";
import { Focusable } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { LinkPreview } from "@/components/site/link-preview";
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
  { name: "Cadence", href: "https://cadencelabs.tech", domain: "cadencelabs.tech", icon: "/cadence.png", desc: "Pressure-sensing insoles that flag injury risk in runners" },
  { name: "Mochi", href: "https://mochitext.com", domain: "mochitext.com", desc: "Calorie tracking via iMessage: just text a meal" },
  { name: "Forge", href: "https://github.com/jaxsonsprinkles/forge", domain: "github.com", desc: "Self-improving AI agent framework" },
  { name: "Avian", href: "https://avian.sh", domain: "avian.sh", desc: "AI outreach research: turn any name into a conversation" },
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
        <h1 className="hero-text">
          Hi, I'm{" "}
          <TooltipTrigger delay={0}>
            <Focusable>
              <a href="https://linkedin.com/in/jaxsonsprinkles" target="_blank" rel="noopener noreferrer" className="hero-link hero-name-link">
                <img src="/IMG_0730.jpg" alt="" className="hero-avatar" />
                Jaxson Sprinkles
                <span className="hero-hover-hint" aria-hidden>
                  <svg viewBox="0 0 80 44" width="80" height="44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M76 8 C58 -2 44 2 44 10 C44 16 52 14 50 8 C48 4 30 6 12 34" />
                    <path d="M5 22 L11 35 L24 31" />
                  </svg>
                  hover me
                </span>
              </a>
            </Focusable>
            <Tooltip>See my LinkedIn</Tooltip>
          </TooltipTrigger>
          , a high school founder building{" "}
          <LinkPreview href="https://cadencelabs.tech" src="/previews/cadence.png" className="hero-link">
            <img src="/cadence.png" alt="" className="hero-logo" />
            Cadence
          </LinkPreview>{" "}
          for runners and{" "}
          <LinkPreview href="https://avian.sh" src="/previews/avian.png" className="hero-link">
            <img src="/avian.png" alt="" className="hero-logo" />
            Avian
          </LinkPreview>{" "}
          for other students and developers.
        </h1>
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
        <SectionLabel>Work</SectionLabel>
        <div className="row-list">
          {work.map((w) => (
            <a key={w.name} href={w.href} target="_blank" rel="noopener noreferrer" className="work-item">
              <img
                className="work-favicon"
                src={w.icon ?? `https://www.google.com/s2/favicons?domain=${w.domain}&sz=32`}
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
