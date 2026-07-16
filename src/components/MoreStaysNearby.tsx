"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Stay {
  title: string;
  price: number;
  rating: number;
  url: string;
}

const CARDS_PER_PAGE = 4;

export default function MoreStaysNearby({ stays, currency }: { stays: Stay[]; currency: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(stays.length / CARDS_PER_PAGE)); 
  // 10 / 4 = ceil(2.5) = 3 


  const updatePageFromScroll = () => {
    const el = scrollRef.current; // gives access to the actual div
    if (!el) return;
                                        // visible container width
    const maxScroll = el.scrollWidth - el.clientWidth;
                  //entire content width 2400 px

    // we don't care about pixels ; independent of screen size
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
                                  // curr

    setPage(Math.round(ratio * (totalPages - 1)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // { passive: true } : It tells the browser the scroll handler won't call preventDefault(), allowing the browser to optimize scrolling for better performance. 

    el.addEventListener("scroll", updatePageFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updatePageFromScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // prevent memory leaks and avoid multiple event listeners if the component unmounts and mounts again.
  }, []);

  // page : left or right 
  // scrollBy() scrolls relative to the current position, making it easy to move exactly one page left or right.
  // scrollTo() requires calculating the absolute destination.

  const scroll = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const atStart = page <= 0; // disable the < at beginning
  const atEnd = page >= totalPages - 1; // disable the > at last

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900 tracking-wide">More stays nearby</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="Previous stays"
            className="a11y-focus flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="Next stays"
            className="a11y-focus flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth">
        {stays.map((stay) => (
          <div key={stay.title} className="shrink-0 w-56">
            {/* Next.js optimizes images by serving appropriately sized images, lazy loading them, and improving performance. */}
            <div className="relative w-56 h-40 rounded-xl overflow-hidden mb-2">
              <Image src={stay.url} alt={stay.title} fill sizes="224px" className="object-cover" />
            </div>
            <p className="text-sm font-medium leading-snug line-clamp-2">{stay.title}</p>
            <p className="text-sm text-neutral-700 mt-1">
              {currency}
              {stay.price.toLocaleString()}{" "}
              <span className="inline-flex items-center gap-1 ml-1">
                <Star size={11} className="fill-current" /> {stay.rating}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}