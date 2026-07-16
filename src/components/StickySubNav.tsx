"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const TABS = ["Photos", "Amenities", "Reviews", "Location"];
const SUBNAV_OFFSET = 68; // nav's height, used for scroll-spy + scroll target offset

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
  const [visible, setVisible] = useState(false); // Controls whether the sticky navbar is shown.
  const [activeTab, setActiveTab] = useState("Photos"); // Stores which tab is currently active.
  const sentinelRef = useRef<HTMLDivElement>(null); //invisible marker placed just after the hero section.
  const isClickScrolling = useRef(false); //used to temporarily disable the scroll-spy while the page is smoothly scrolling after clicking a tab.

  // Show/hide the nav once the hero photo section scrolls past
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    //no continuously listening to the scroll event
    const observer = new IntersectionObserver(
      ([entry]) => {
        //If sentinel disappears ; entry.isIntersecting = false
        //If sentinel appears ; entry.isIntersecting = true
        const next = !entry.isIntersecting; 
        setVisible(next);
        onVisibilityChange?.(next); 
      },
      { rootMargin: "-64px 0px 0px 0px" } // it triggers 64px earlier : shrinks the "viewport" the observer checks against, so it triggers slightly early/late relative to the real edges.
    );
    observer.observe(sentinel); // starts observing that invisible div
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-spy: highlight whichever section tab is currently in view
  useEffect(() => {
    const ids = TABS.map((t) => `section-${t.toLowerCase()}`);
    
    // gets all DOM elements
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    //watches every section
    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore scroll-spy updates while we're mid-animation from a tab click,
        // so the clicked tab doesn't get overridden by whatever briefly intersects.

        //if we click location it will directly go there will not go sequence wise 
        if (isClickScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tab = TABS.find((t) => `section-${t.toLowerCase()}` === entry.target.id);
            if (tab) setActiveTab(tab);
          }
        });
      },
      { rootMargin: `-${SUBNAV_OFFSET + 1}px 0px -70% 0px`, threshold: 0 }
      //rootMargin cuts 70% off the bottom, so a section only counts once it's near the top) 
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTab = (tab: string) => {
    setActiveTab(tab);

    //find the section
    const el = document.getElementById(`section-${tab.toLowerCase()}`);
    if (!el) return;

    //Locks scroll spy
    isClickScrolling.current = true;
    
    //getBoundingClientRect().top gives the element's position relative to the current viewport
    //adding window.scrollY converts that to a position relative to the whole document
    //subtracting the offset leaves exactly enough gap for the fixed nav.
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
        className={`fixed top-0 left-0 right-0 z-30 bg-white border-b border-neutral-200 transition-transform duration-200 ${
          visible ? "-translate-y-0" : "-translate-y-full"
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
