import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SoftwareCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  selected: boolean;
  installed?: boolean;
  onToggle: (id: string) => void;
}

function getIcon(name: string): LucideIcon {
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? Icons.Package;
}

export function SoftwareCard({
  id,
  name,
  description,
  icon,
  selected,
  installed,
  onToggle,
}: SoftwareCardProps) {
  const Icon = getIcon(icon);

  return (
    <button
      onClick={() => onToggle(id)}
      className={`group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "card-glow border-accent/50 bg-accent/8"
          : "border-border-default bg-bg-surface hover:border-border-hover hover:bg-bg-surface-hover"
      }`}
    >
      {installed && (
        <span className="absolute top-2 right-2 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
          Installed
        </span>
      )}

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
          selected ? "bg-accent/20 text-accent" : "bg-bg-surface-active text-text-secondary group-hover:text-text-primary"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <h3
          className={`text-sm font-medium ${selected ? "text-accent" : "text-text-primary"}`}
        >
          {name}
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>

      <div
        className={`absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
          selected
            ? "border-accent bg-accent"
            : "border-border-hover bg-transparent"
        }`}
      >
        {selected && <Icons.Check className="h-3 w-3 text-bg-base" />}
      </div>
    </button>
  );
}
