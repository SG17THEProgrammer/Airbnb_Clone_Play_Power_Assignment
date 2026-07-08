"use client";

import { useState } from "react";

interface Review {
  id: number;
  name: string;
  timeOnAirbnb: string;
  when: string;
  rating: number;
  text: string;
  image: string;
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

export default function Reviews({ reviews, reviewCount }: { reviews: Review[]; reviewCount: number }) {
  return (
    <div className="py-6 border-b border-neutral-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
      <button className="a11y-focus mt-8 border border-black-900 rounded-lg px-5 py-3 text-sm text-black-900 font-semibold hover:bg-neutral-100 transition-colors">
        Show all {reviewCount} reviews
      </button>
    </div>
  );
}
