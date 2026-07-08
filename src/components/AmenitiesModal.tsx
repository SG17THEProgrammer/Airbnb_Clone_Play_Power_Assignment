"use client";

import { useEffect, useRef } from "react";
import {
  X, Wind, SprayCan, Droplet, Waves, ChefHat, Refrigerator, Microwave, CookingPot,
  UtensilsCrossed, Snowflake, Fan, Camera, AlertTriangle, Siren, Wifi, Laptop,
  DoorOpen, Trees, Car, Dumbbell, Droplets, LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Wind, SprayCan, Droplet, Waves, ChefHat, Refrigerator, Microwave, CookingPot,
  UtensilsCrossed, Snowflake, Fan, Camera, AlertTriangle, Siren, Wifi, Laptop,
  DoorOpen, Trees, Car, Dumbbell, Droplets,
};

interface AmenityItem {
  label: string;
  icon: string;
  available: boolean;
}

interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

export default function AmenitiesModal({
  categories,
  onClose,
}: {
  categories: AmenityCategory[];
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4 animate-overlay-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="What this place offers"
        className="bg-white w-full rounded-2xl max-w-3xl overflow-hidden max-h-[80vh] relative"
      >
        <div className="sticky top-0 bg-white px-6 pt-6 pb-2">
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="a11y-focus flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-8 ml-8 overflow-y-auto  max-h-[65vh]">
          <h2 className="text-2xl font-semibold mt-4 tracking-wide">What this place offers</h2>
          {categories.map((cat) => (
            <div key={cat.category} className="py-4">
              <h3 className="font-semibold text-lg mb-2">{cat.category}</h3>
              {cat.items.map((item, idx) => {
                const Icon = iconMap[item.icon];
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 py-3 ${idx > 0 ? "border-t border-neutral-200" : ""
                      }`}
                  >
                    {Icon && (
                      <Icon
                        size={22}
                        className={item.available ? "text-neutral-900" : "text-neutral-500"}
                      />
                    )}
                    <span className={`text-base ${item.available ? "text-neutral-900" : "text-neutral-500 line-through"}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}