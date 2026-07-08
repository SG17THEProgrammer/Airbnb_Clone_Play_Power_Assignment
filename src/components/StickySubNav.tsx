"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const TABS = ["Photos", "Amenities", "Reviews", "Location"];
const SUBNAV_OFFSET = 150; // px — fixed header (80px) + this nav's own height, used for scroll-spy + scroll target offset

interface StickySubNavProps {
  currency: string;
  totalBeforeTaxes: number;
  nights: number;
  rating: number;
  reviewCount: number;
  onVisibilityChange?: (visible: boolean) => void;
}

export default function StickySubNav({
  currency,
  totalBeforeTaxes,
  nights,
  rating,
  reviewCount,
  onVisibilityChange,
}: StickySubNavProps) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Photos");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  // Show/hide the nav once the hero photo section scrolls past
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting;
        setVisible(next);
        onVisibilityChange?.(next);
      },
      { rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-spy: highlight whichever section tab is currently in view
  useEffect(() => {
    const ids = TABS.map((t) => `section-${t.toLowerCase()}`);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore scroll-spy updates while we're mid-animation from a tab click,
        // so the clicked tab doesn't get overridden by whatever briefly intersects.
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tab = TABS.find((t) => `section-${t.toLowerCase()}` === entry.target.id);
            if (tab) setActiveTab(tab);
          }
        });
      },
      { rootMargin: `-${SUBNAV_OFFSET + 1}px 0px -70% 0px`, threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    const el = document.getElementById(`section-${tab.toLowerCase()}`);
    if (!el) return;

    isClickScrolling.current = true;
    const top = el.getBoundingClientRect().top + window.scrollY - SUBNAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    // Release the scroll-spy lock once the smooth scroll has settled
    window.clearTimeout((handleTab as unknown as { _t?: number })._t);
    (handleTab as unknown as { _t?: number })._t = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  return (
    <>
      {/* sentinel marks where the hero section ends; nav appears once scrolled past it */}
      <div ref={sentinelRef} />
      <div
        className={`fixed top-20 left-0 right-0 z-30 bg-white border-b border-neutral-200 transition-transform duration-200 ${
          visible ? "-translate-y-20" : "-translate-y-[calc(100%+80px)]"
        }`}
      >
        <div className="max-w-[1160px] mx-auto px-6 lg:px-10 flex items-center justify-between h-17">
          <nav className="flex items-center gap-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTab(tab)}
                aria-current={activeTab === tab ? "true" : undefined}
                className={`a11y-focus text-sm pb-1 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-black-900 font-semibold text-black-900"
                    : "border-transparent text-black-700 hover:text-black-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <p className="text-sm text-end">
              <span className="font-semibold">
                {currency}
                {totalBeforeTaxes.toLocaleString()}
              </span>{" "}
              <span className="text-neutral-500">for {nights} nights</span>
              <br />
              <Star size={12} className="inline fill-current -mt-0.5" /> {rating} &middot; {reviewCount} reviews
            </p>
            <button className="a11y-focus bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white text-sm font-medium rounded-[40px] px-5 py-2 hover:brightness-95 transition-all">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
