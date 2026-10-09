import { Focusable } from "react-aria-components";
import type { ComponentProps, ReactElement } from "react";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";

/** Hover-only tooltip around a non-interactive element (kept out of the tab order). */
export function Hint({ label, children, delay = 0 }: { label: string; children: ReactElement; delay?: number }) {
  return (
    <TooltipTrigger delay={delay}>
      <Focusable excludeFromTabOrder>{children as ComponentProps<typeof Focusable>["children"]}</Focusable>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}
