
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

interface Review {
  id: number;
  name: string;
  timeOnAirbnb: string;
  when: string;
  rating: number;
  text: string;
  image: string;
  tags: string[];
}

const TRUNCATE_LENGTH = 180;

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > TRUNCATE_LENGTH;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, TRUNCATE_LENGTH).trimEnd() + "…";

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white text-sm font-medium">
          {review.image ? <img src={review.image} alt="pic" className="rounded-[50%]" /> : review.name[0]}
        </div>
        <div>
          <p className="text-base text-black font-medium">{review.name}</p>
          <p className="text-sm text-neutral-500">{review.timeOnAirbnb}</p>
        </div>
      </div>
      <p className="text-sm text-black-900 mb-2">
        {"★".repeat(review.rating)} · {review.when}
      </p>
      <p className="text-base text-black-700 leading-relaxed whitespace-pre-line">{displayText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="a11y-focus text-base font-semibold text-black-900 underline mt-1"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

interface ReviewsProps {
  reviews: Review[];
  reviewCount: number;
  activeTag: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Reviews({ reviews, reviewCount, activeTag, searchQuery, onSearchChange }: ReviewsProps) {
  // Filtering is derived, not stored — it's always recomputed from the current
  // reviews + activeTag + searchQuery, so there's no separate "filteredReviews"
  // state that could ever get out of sync with its inputs.
  const filteredReviews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return reviews.filter((r) => {
      const matchesTag = !activeTag || r.tags.includes(activeTag);
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.text.toLowerCase().includes(query);
      return matchesTag && matchesQuery;
    });
  }, [reviews, activeTag, searchQuery]);

  return (
    <div className="py-6 border-b border-neutral-200">
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reviews"
          aria-label="Search reviews"
          className="a11y-focus w-full border border-neutral-300 rounded-lg pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="a11y-focus absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {activeTag && (
        <p className="text-sm text-neutral-500 mb-4">
          Showing reviews tagged <span className="font-semibold text-neutral-900">{activeTag}</span>
        </p>
      )}

      {filteredReviews.length === 0 ? (
        <p className="text-sm text-neutral-500 py-6">No reviews match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {filteredReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      <button className="a11y-focus mt-8 border border-black-900 rounded-lg px-5 py-3 text-sm text-black-900 font-semibold hover:bg-neutral-100 transition-colors">
        Show all {reviewCount} reviews
      </button>
    </div>
  );
}
