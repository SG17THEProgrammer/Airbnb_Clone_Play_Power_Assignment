"use client";

import { useEffect, useState } from "react";
import { Share, Heart } from "lucide-react";
import Toast from "@/components/Toast";

export default function ListingHeader({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSave = () => {
    const next = !saved;
    setSaved(next);
    setToastMessage(next ? "Saved to wishlist" : "Removed from wishlist");
    setToastVisible(true);
  };

  useEffect(() => {
    if (!toastVisible) return;
    const timer = setTimeout(() => setToastVisible(false), 1800);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  return (
    <div className="flex items-start justify-between gap-4 mb-2">
      <h1 className="text-2xl font-bold tracking-tight text-black-700 tracking-wide">{title}</h1>
      <div className="flex items-center gap-1 shrink-0">
        <button className="a11y-focus flex items-center gap-2 text-sm font-semibold underline px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <Share size={16} /> Share
        </button>
        <button
          onClick={handleSave}
          aria-pressed={saved}
          className="a11y-focus flex items-center gap-2 text-sm font-semibold underline px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <Heart size={16} className={saved ? "fill-[#FF385C] text-[#FF385C]" : ""} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <Toast message={toastMessage} show={toastVisible} />
    </div>
  );
}
