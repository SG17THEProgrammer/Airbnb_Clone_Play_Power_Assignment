import { TreePine, Fan, KeyRound, LucideIcon , DoorClosed } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { TreePine, Fan, DoorClosed };

interface Highlight {
  icon: string;
  title: string;
  sub: string;
}

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="py-6 border-b border-neutral-200 space-y-6">
      {highlights.map((h) => {
        const Icon = iconMap[h.icon];
        return (
          <div key={h.title} className="flex gap-4">
            {Icon == DoorClosed ? <Icon size={26} className="shrink-0 mt-0.5 scale-x-[-1]" /> : <Icon size={26} className="shrink-0 mt-0.5" />}
            <div>
              <p className="font-medium text-sm">{h.title}</p>
              <p className="text-neutral-500 text-sm">{h.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
