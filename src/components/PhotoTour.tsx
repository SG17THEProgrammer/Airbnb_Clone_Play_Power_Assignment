"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Share, Heart, ChevronLeft } from "lucide-react";
import { rooms } from "@/data/listing";

interface PhotoTourProps {
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
}

const HEADER_H = 80; // px — Photo Tour's own top bar
const NAV_H = 52; // px — sticky text-only category nav

export default function PhotoTour({ onClose, onOpenLightbox }: PhotoTourProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  //modal management
  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; 
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = ""; //cleanup: restore scroll on close/unmount
      // Without it, closing the modal would leave the page permanently unscrollable.
    };
  }, [onClose]);

  // Scroll Spy
  useEffect(() => {
    const root = scrollContainerRef.current; // scroll inside the component itself
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Suppose Whenever Kitchen enters visible area setActiveRoom(id); now the Kitchen will be highlighted
            const id = entry.target.getAttribute("data-room-id");
            if (id) setActiveRoom(id);
          }
        });
      },
      { root, rootMargin: `-${HEADER_H + NAV_H + 1}px 0px -70% 0px`, threshold: 0 }
      //rootMargin shrinks the "viewport" the observer checks against, so it triggers slightly early/late relative to the real edges.
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToRoom = (id: string) => {
    setActiveRoom(id);

    const el = sectionRefs.current[id]; // gets the section that is clicked 
    const container = scrollContainerRef.current;

    if (!el || !container) return;

    // relative position inside container 
    // getBoundingClientRect().top gives the element's position relative to the current viewport
    const top =
      container.scrollTop +
      el.getBoundingClientRect().top -
      container.getBoundingClientRect().top -
      HEADER_H;     // heading should not be hidden so subtracted that 



    container.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  // eg : Translating "3rd photo of room 5" into a global Lightbox index
  let runningIndex = 0;
  const roomStartIndex: Record<string, number> = {};
  rooms.forEach((r) => {
    roomStartIndex[r.id] = runningIndex;
    runningIndex += r.photos.length;
  });

// global index 
//   roomStartIndex
// {
// living :0
// kitchen:5
// bedroom:8
// }

// Click Kitchen photo,  index = 2 ; Actually opens 5+2=7

  // for rendering room photos
  const renderRoomPhotos = (
    room: (typeof rooms)[number],
    startIndex: number
  ) => {
    const renderLarge = (photo: typeof room.photos[number], index: number) => (
      <button
        key={photo.id}
        onClick={() => onOpenLightbox(startIndex + index)}
        aria-label={`Open photo: ${photo.alt}`}
        className="group hero-photo-wrap a11y-focus relative w-full aspect-[16/10] h-[300px] rounded-xl overflow-hidden block"
      >
        <Image
          src={photo.url}
          alt={photo.alt}
          fill
          sizes="(max-width:768px) 100vw,640px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </button>
    );

    const renderPair = (photos: typeof room.photos, start: number) => (
      <div key={`pair-${start}`} className="grid grid-cols-2 gap-4">
        {photos.slice(start, start + 2).map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => onOpenLightbox(startIndex + start + i)}
            aria-label={`Open photo: ${photo.alt}`}
            className="group hero-photo-wrap a11y-focus relative w-full aspect-square rounded-xl overflow-hidden block"
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width:768px) 50vw,320px"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    );

    switch (room.id) {
      // LR1 : L -> 2
      case "living-room-1":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}
          </>
        );

      // LR2 : L -> 2 -> L -> 2 -> L 
      case "living-room-2":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}
            {renderLarge(room.photos[3], 3)}
            {renderPair(room.photos, 4)}
            {renderLarge(room.photos[6], 6)}
          </>
        );

      // Kitchen : 2 side by side
      case "full-kitchen":
        return renderPair(room.photos, 0);

      // Bedroom : L -> 2 -> L -> 2 
      case "bedroom":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}
            {renderLarge(room.photos[3], 3)}
            {renderPair(room.photos, 4)}
          </>
        );

      // Bathroom : only 1
      case "full-bathroom":
        return renderLarge(room.photos[0], 0);

      // Gym : L -> 2 -> 2
      case "gym":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}
            {renderPair(room.photos, 3)}
          </>
        );

      // Exterior : L -> 2 -> L -> 2 
      case "exterior":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}
            {renderLarge(room.photos[3], 3)}
            {renderPair(room.photos, 4)}
          </>
        );

      // Pool : L -> 2
      case "pool":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}
          </>
        );

      // Additional : L -> 2 -> L -> 2 -> L -> 2 -> L
      case "additional":
        return (
          <>
            {renderLarge(room.photos[0], 0)}
            {renderPair(room.photos, 1)}

            {renderLarge(room.photos[3], 3)}
            {renderPair(room.photos, 4)}

            {renderLarge(room.photos[6], 6)}
            {renderPair(room.photos, 7)}

            {renderLarge(room.photos[9], 9)}
          </>
        );

      default:
        return (
          <>
            {room.photos.map((photo, index) =>
              renderLarge(photo, index)
            )}
          </>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      className="fixed inset-0 z-[60] bg-white animate-overlay-in"
    >
      <div ref={scrollContainerRef} className="h-full overflow-y-auto">
        <header
          className="sticky top-0 z-30 bg-white"
          style={{ height: HEADER_H }}
        >
          <div className="flex items-center justify-between px-6 h-full max-w-7xl  ">
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close photo tour"
              className="a11y-focus flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <span className="text-base font-semibold text-black-900 tracking-wide">Photo tour</span>
            <div className="flex items-center gap-2">
              <button aria-label="Share" className="a11y-focus flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 transition-colors">
                <Share size={16} />
              </button>
              <button aria-label="Save" className="a11y-focus flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100 transition-colors">
                <Heart size={16} />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6">
          {/* Full thumbnail index — first thing in the scroll flow, not sticky */}
          <div className="flex flex-wrap gap-2 py-8">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollToRoom(room.id)}
                aria-label={`Jump to ${room.name}`}
                className="a11y-focus flex flex-col items-start gap-2 w-28"
              >
                <div className=" relative
      w-27
      h-27
      rounded-lg
      overflow-hidden
      transition-all
      duration-300
      ease-out
      hover:scale-102
      hover:-translate-y-1
      hover:shadow-xl
      hover:z-10">
                  <Image src={room.photos[0].url} alt="" fill sizes="112px" className="object-cover" />
                </div>
                <span className="text-sm text-neutral-500"> {room.name === "Additional photos" ? (
                  <>
                    {room.name.split(" ")[0]}
                    <br />
                    <span className="-ml-5">{room.name.split(" ")[1]}</span>
                  </>
                ) : (
                  room.name
                )}</span>
              </button>
            ))}
            {/* <button
              aria-label="Additional photos"
              className="a11y-focus flex flex-col items-start gap-2 w-28"
            >
              <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-400 text-center px-1">
                <Image src={""} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <span className="text-xs text-neutral-700">Additional photos</span>
            </button> */}
          </div>

          {/* Sticky condensed text nav — pins under the header once scrolled to it */}
          {/* <nav
            aria-label="Jump to room"
            className="sticky z-20 bg-white border-b border-neutral-200 flex gap-6 overflow-x-auto no-scrollbar"
            style={{ top: HEADER_H, height: NAV_H }}
          >
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollToRoom(room.id)}
                aria-current={activeRoom === room.id ? "true" : undefined}
                className={`a11y-focus shrink-0 h-full flex items-center text-sm border-b-2 transition-colors ${
                  activeRoom === room.id
                    ? "border-neutral-900 font-semibold text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {room.name}
              </button>
            ))}
          </nav> */}

          {/* Room sections: sticky label on the left, photos flowing on the right */}
          <div className="pb-16 grid grid-template-columns-[40%_10%_50%]">
            {rooms.map((room) => {
              const [first, ...remainder] = room.photos;
              return (
                <div
                  key={room.id}
                  data-room-id={room.id}
                  ref={(el) => {
                    sectionRefs.current[room.id] = el;
                  }}
                  style={{ scrollMarginTop: HEADER_H + NAV_H }}
                  className="grid md:grid-cols-[3fr_3fr] pt-5"
                >
                  <div
                    className="md:sticky self-start max-w-[450px]"
                    style={{ top: HEADER_H }}
                  >
                    <h2 className="text-3xl font-semibold text-neutral-900">{room.name}</h2>
                    <p className="text-neutral-500 text-base mt-2">
                      {room.subtitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {renderRoomPhotos(room, roomStartIndex[room.id])}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
