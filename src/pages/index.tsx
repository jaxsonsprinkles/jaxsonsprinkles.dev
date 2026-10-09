import type { ComponentType } from "react";
import { HomePage } from "@/pages/home";
import { AboutPage } from "@/pages/about";
import { BlogPage } from "@/pages/blog";
import { ContactPage } from "@/pages/contact";
import { ProjectsPage } from "@/pages/projects";
import { BuildPostPage, EmailPostPage } from "@/pages/posts";
import { ArticlesPage, LinkedInArticlePage } from "@/pages/articles";

export const pages: Record<string, ComponentType> = {
  home: HomePage,
  about: AboutPage,
  blog: BlogPage,
  contact: ContactPage,
  projects: ProjectsPage,
  "post-build": BuildPostPage,
  "post-email": EmailPostPage,
  articles: ArticlesPage,
  "article-linkedin": LinkedInArticlePage,
};
