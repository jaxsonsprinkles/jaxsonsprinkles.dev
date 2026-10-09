import type { ReactNode } from "react";
import { Divider } from "@/components/base/divider/divider";
import { LinkButton } from "@/components/base/buttons/link-button";
import { RiArrowRightLine } from "@remixicon/react";

export function SectionLabel({
  children,
  more,
  first,
}: {
  children: ReactNode;
  more?: { href: string; label: string };
  first?: boolean;
}) {
  return (
    <div className={`mb-5 flex items-center gap-3 ${first ? "" : "mt-13"}`}>
      <Divider
        align="start"
        className="flex-1"
        contentClassName="text-body-medium text-text-tertiary"
      >
        {children}
      </Divider>
      {more && (
        <LinkButton href={more.href} variant="secondary" size="xs" trailingIcon={RiArrowRightLine}>
          {more.label}
        </LinkButton>
      )}
    </div>
  );
}
