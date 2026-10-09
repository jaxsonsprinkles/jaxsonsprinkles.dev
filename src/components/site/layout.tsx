import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useEffect, useState, type ReactNode } from "react";
import { IconButton } from "@/components/base/buttons/icon-button";
import { cx } from "@/utils/cx";

const links: { href: string; label: string; match: string[]; desktop: boolean; external?: boolean }[] = [
  { href: "/index.html", label: "Home", match: ["", "index.html"], desktop: true },
  { href: "/projects.html", label: "Work", match: ["projects.html"], desktop: true },
  { href: "/blog.html", label: "Writing", match: ["blog.html"], desktop: true },
  { href: "/about.html", label: "About", match: ["about.html"], desktop: true },
  { href: "/contact.html", label: "Contact", match: ["contact.html"], desktop: true },
  { href: "/resume.pdf", label: "Resume", match: [], desktop: true, external: true },
];

// Blog entries live under /blog/ but highlight the Writing tab.
function currentPage() {
  const { pathname } = window.location;
  if (pathname.startsWith("/blog/")) return "blog.html";
  return pathname.split("/").pop() ?? "";
}

export function Layout({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const page = currentPage();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-100 flex h-13 items-center justify-end border-b border-separator-border bg-background-full/90 px-5 backdrop-blur-sm sm:px-12">
        <div className="hidden items-center gap-0.5 sm:flex">
          {links
            .filter((l) => l.desktop && !(l.label === "Home" && l.match.includes(page)))
            .map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                aria-current={l.match.includes(page) ? "page" : undefined}
                className={cx(
                  "rounded-md px-2.5 py-1.5 font-mono text-caption-1-medium text-text-tertiary transition-colors duration-150",
                  "outline-none hover:bg-background-secondary-default hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                  l.match.includes(page) && "bg-background-secondary-default text-text-primary",
                )}
              >
                {l.label}
              </a>
            ))}
        </div>
        <IconButton
          size="small"
          className="z-200 sm:hidden"
          icon={open ? RiCloseLine : RiMenuLine}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        />
      </nav>

      <div
        className={cx(
          "fixed inset-0 z-150 flex flex-col items-center justify-center gap-2 bg-background-full transition-opacity duration-200 sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.external ? "_blank" : undefined}
            onClick={() => setOpen(false)}
            className="px-6 py-2.5 font-mono text-title-3-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            {l.label}
          </a>
        ))}
      </div>

      <main className="content">{children}</main>
      {footer}
    </>
  );
}
