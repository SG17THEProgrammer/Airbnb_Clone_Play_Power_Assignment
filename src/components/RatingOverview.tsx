import { Sparkles, SprayCan , CircleCheck, KeyRound, MessageSquare, Map, Tag, Sofa, Ban, Flag, Gift, Droplets, Image as ImageIcon, LucideIcon } from "lucide-react";

interface RatingCategory {
  label: string;
  value: number;
}

interface Tag {
  label: string;
  count: number;
}

const categoryIcons: Record<string, LucideIcon> = {
  Cleanliness: SprayCan,
  Accuracy: CircleCheck,
  "Check-in": KeyRound,
  Communication: MessageSquare,
  Location: Map,
  Value: Tag,
};

const tagIcons: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  Comfort: { icon: Sofa, bg: "bg-teal-100", color: "text-teal-700" },
  Accuracy: { icon: CircleCheck, bg: "bg-green-100", color: "text-green-700" },
  "Hot tub": { icon: Ban, bg: "bg-rose-100", color: "text-rose-700" },
  Condition: { icon: Flag, bg: "bg-blue-100", color: "text-blue-700" },
  Hospitality: { icon: Gift, bg: "bg-pink-100", color: "text-pink-700" },
  Cleanliness: { icon: Droplets, bg: "bg-sky-100", color: "text-sky-700" },
  Amenities: { icon: ImageIcon, bg: "bg-amber-100", color: "text-amber-700" },
};

// Static distribution bars for the overall-rating breakdown (5-star through 1-star)
const distribution = [
  { stars: 5, pct: 96 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export default function RatingOverview({
  rating,
  categories,
  tags,
  activeTag,
  onTagClick,
}: {
  rating: number;
  categories: RatingCategory[];
  tags: Tag[];
  activeTag: string | null;
  onTagClick: (tag: string) => void;
}) {
  const rest = categories.filter((c) => c.label !== "Overall rating");

  return (
    <div className="py-10 border-b border-neutral-200 text-center">
      {/* <p className="text-6xl font-medium">{rating}</p> */}
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <img
          src="./images/rating.png"
          alt="rating"
          className="h-[130px]"
        />
<br />
        <h2 className="text-2xl font-semibold">
          Guest favourite
        </h2>

        <p className="text-base text-black-500 max-w-sm">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
      </div>
      <button className="a11y-focus text-sm underline font-semibold mt-2">How reviews work</button>

      <div className="grid grid-cols-[240px_repeat(6,1fr)] gap-0 mx-auto mt-10 text-left divide-x divide-neutral-200 px-6">
        {/* Overall rating: 5-row horizontal bar chart */}
        <div className="w-[230px] pr-6">
          <p className="text-sm font-semibold mb-3">Overall rating</p>
          <div className="space-y-1">
            {distribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-500 w-2">{row.stars}</span>
                <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other categories: icon + number, no bar */}
        {rest.map((c) => {
          const Icon = categoryIcons[c.label];
          return (
            <div key={c.label} className="px-6">
              <p className="text-sm font-semibold mb-3">{c.label}</p>
              <p className="text-lg font-bold mb-2">{c.value == 5 ? c.value + ".0" : c.value}</p>
              {Icon == SprayCan || Icon == KeyRound ? <Icon size={30} className="text-neutral-900 scale-x-[-1]" />  : <Icon size={30} className="text-neutral-900" />}
            </div>
          );
        })}
      </div>

      <div className="flex flex-nowrap overflow-hidden justify-start gap-4 mt-12">       
        {tags.map((t) => {
        const conf = tagIcons[t.label];
        const Icon = conf?.icon;
        const isActive = activeTag === t.label;
        return (
          <button
            key={t.label}
            onClick={() => onTagClick(t.label)}
            aria-pressed={isActive}
            className={`a11y-focus flex items-center gap-2 text-sm rounded-xl p-2 px-5 border shrink-0 transition-colors ${
              isActive ? "border-neutral-900 bg-neutral-50 font-semibold" : "border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            {Icon && (
              <span className={`flex items-center justify-center w-7 h-7 rounded-full ${conf.bg} ${conf.color}`}>
                <Icon size={14} />
              </span>
            )}
            {t.label} {t.count}
          </button>
        );
      })}
      </div>
      {activeTag && (
        <button
          onClick={() => onTagClick(activeTag)}
          className="a11y-focus text-sm underline font-medium mt-4"
        >
          Clear filter ({activeTag}) ✕
        </button>
      )}
    </div>
  );
}