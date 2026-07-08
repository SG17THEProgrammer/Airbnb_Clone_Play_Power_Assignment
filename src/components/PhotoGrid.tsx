"use client";

import Image from "next/image";
import { Grid3x3 } from "lucide-react";
import { RoomPhoto } from "@/data/listing";

interface PhotoGridProps {
  photos: RoomPhoto[];
  onOpenTour: () => void;
}

export default function PhotoGrid({ photos, onOpenTour }: PhotoGridProps) {
  const main = photos[0];
  const rest = photos.slice(1, 5);

  return (
    <div className="relative rounded-xl overflow-hidden grid grid-cols-2 gap-2 h-[280px] md:h-[360px]">
      <button
        onClick={onOpenTour}
        aria-label="Open photo gallery"
        className="a11y-focus hero-photo-wrap relative overflow-hidden h-full"
      >
        <Image
          src={main.url}
          alt={main.alt}
          fill
          sizes="50vw"
          priority
          className="object-cover"
        />
      </button>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
        {rest.map((photo) => (
          <button
            key={photo.id}
            onClick={onOpenTour}
            aria-label="Open photo gallery"
            className="a11y-focus hero-photo-wrap relative overflow-hidden"
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <button
        onClick={onOpenTour}
        aria-label="Show all photos"
        className="a11y-focus absolute bottom-4 right-4 flex items-center gap-2 bg-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
      >
        <Grid3x3 size={16} />
        Show all photos
      </button>
    </div>
  );
}
