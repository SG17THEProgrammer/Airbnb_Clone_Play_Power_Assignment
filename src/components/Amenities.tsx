"use client";

import { ChefHat, Wifi, Laptop, Car, Waves, Droplets, PawPrint, Camera, AlertTriangle, Siren, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ChefHat, Wifi, Laptop, Car, Waves, Droplets, PawPrint, Camera, AlertTriangle, Siren,
};

interface Amenity {
  icon: string;
  label: string;
  sub: string;
  available: boolean;
}

export default function Amenities({ amenities, onShowAll }: { amenities: Amenity[]; onShowAll: () => void }) {
  return (
    <div className="py-6 border-b border-neutral-200">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">What this place offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        {amenities.map((a) => {
          const Icon = iconMap[a.icon];
          return (
            <div key={a.label} className="flex items-center gap-4">
              {Icon && <Icon size={22} className={a.available ? "" : "text-neutral-500"} />}
              <div>
                <p className={`text-lg ${a.available ? "" : "text-neutral-500 line-through"}`}>{a.label}</p>
                {a.sub && <p className="text-neutral-500 text-xs">{a.sub}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onShowAll}
        className="a11y-focus mt-6 border border-neutral-900 rounded-lg px-5 py-3 text-lg font-semibold hover:bg-neutral-100 transition-colors mb-4"
      >
        Show all 50 amenities
      </button>
    </div>
  );
}
