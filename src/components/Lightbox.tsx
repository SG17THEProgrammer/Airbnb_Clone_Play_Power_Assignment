"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grip } from "lucide-react";
import { RoomPhoto } from "@/data/listing";

interface LightboxProps {
  photos: RoomPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const goPrev = () => onNavigate(index === 0 ? photos.length - 1 : index - 1);
  const goNext = () => onNavigate(index === photos.length - 1 ? 0 : index + 1);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.roomName} — photo ${index + 1} of ${photos.length}`}
      className="fixed inset-0 z-[70] bg-white flex flex-col animate-overlay-in"
    >
      <div className="flex items-center justify-between px-6 py-4 text-neutral-900 shrink-0">
<button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close photo viewer"
          className="a11y-focus flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <Grip size={22}/>
        </button>          <span className="text-base font-semibold">{photo.roomName}</span>
        <div className="flex items-center">

        <div className="flex flex-col items-center">
          <span className="text-sm text-black-500 mr-3">
            {index + 1} of {photos.length}
          </span>
        </div>
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close photo viewer"
          className="a11y-focus flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors"
          >
          <X size={22} />
        </button>
          </div>
        {/* <div className="w-10" aria-hidden="true" /> */}
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 pb-6">
        <button
          onClick={goPrev}
          aria-label="Previous photo"
          className="a11y-focus absolute left-4 md:left-8 top-1/3.5 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white text-neutral-900 border border-black-200 shadow-lg hover:scale-105 transition-transform"
        >
          <ChevronLeft size={22} />
        </button>

        <div key={photo.id} className="relative w-full h-full max-w-5xl animate-lightbox-in">
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <button
          onClick={goNext}
          aria-label="Next photo"
          className="a11y-focus absolute right-4 md:right-8 top-1/3.5 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white text-neutral-900 border border-black-200 shadow-lg hover:scale-105 transition-transform"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}