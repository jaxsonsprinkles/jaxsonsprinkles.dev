import { RiArrowRightUpLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { Layout } from "@/components/site/layout";
import { TechTags } from "@/components/site/tech-tags";
import { projects } from "@/content/projects";

export function ProjectsPage() {
  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Work</h1>
        <p className="page-sub">Things I've built — AI tools, systems experiments, and apps people actually use.</p>
      </div>

      <div>
        {projects.map((p) => (
          <div key={p.title} className="project-card">
            <div className="project-card-top">
              <div>
                <h2 className="project-card-title">{p.title}</h2>
                <p className="project-card-tag">{p.tag}</p>
              </div>
              {p.href && (
                <ButtonLink
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="small"
                  trailingIcon={RiArrowRightUpLine}
                  className="shrink-0 font-mono"
                >
                  {p.linkLabel}
                </ButtonLink>
              )}
            </div>
            <p className="project-card-desc">{p.desc}</p>
            {p.impact && (
              <div className="project-card-impact">
                <span className="impact-label">Impact:</span> {p.impact}
              </div>
            )}
            <TechTags items={p.tech} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
