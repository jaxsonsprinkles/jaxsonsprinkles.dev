import { Chip } from "@/components/base/badges/chip";

export function TechTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Chip key={t} variant="caption" color="soft" className="font-mono">
          {t}
        </Chip>
      ))}
    </div>
  );
}
