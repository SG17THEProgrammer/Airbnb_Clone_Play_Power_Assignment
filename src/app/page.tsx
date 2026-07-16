"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PhotoGrid from "@/components/PhotoGrid";
import ListingHeader from "@/components/ListingHeader";
import GuestFavoriteBadge from "@/components/GuestFavoriteBadge";
import HostSection from "@/components/HostSection";
import Highlights from "@/components/Highlights";
import WhereYoullSleep from "@/components/WhereYoullSleep";
import Amenities from "@/components/Amenities";
import AmenitiesModal from "@/components/AmenitiesModal";
import Calendar from "@/components/Calendar";
import RatingOverview from "@/components/RatingOverview";
import Reviews from "@/components/Reviews";
import LocationMap from "@/components/LocationMap";
import HostCard from "@/components/HostCard";
import ThingsToKnow from "@/components/ThingsToKnow";
import MoreStaysNearby from "@/components/MoreStaysNearby";
import BookingCard from "@/components/BookingCard";
import StickySubNav from "@/components/StickySubNav";
import PhotoTour from "@/components/PhotoTour";
import Lightbox from "@/components/Lightbox";
import {
  photos,
  amenities,
  amenityCategories,
  highlights,
  ratingCategories,
  reviewTags,
  reviews,
  nearbyStays,
  listing,
} from "@/data/listing";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [subNavVisible, setSubNavVisible] = useState(false);
  const [seeMore, setSeeMore] = useState(false)
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");

  // Clicking an already-active tag clears the filter (toggle, not just select)
  const handleTagClick = (tag: string) => {
    setActiveTag((current) => (current === tag ? null : tag));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1180px] mx-auto px-6 lg:px-10 py-6">
        <ListingHeader title={listing.title} />

        <div id="section-photos">
          <PhotoGrid photos={photos} onOpenTour={() => setTourOpen(true)} />
        </div>

        <StickySubNav
          currency={listing.currency}
          totalBeforeTaxes={listing.totalBeforeTaxes}
          nights={listing.nights}
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          // onOpenAmenities={() => setAmenitiesOpen(true)}
          onVisibilityChange={setSubNavVisible}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-neutral-900">{listing.propertyType}</h2>
            <p className="text-black-500 text-base mt-1">
              {listing.guests} guests · {listing.bedrooms} bedroom · {listing.beds} bed · {listing.baths} bathroom
            </p>

            <GuestFavoriteBadge rating={listing.rating} reviewCount={listing.reviewCount} />

            <HostSection host={listing.host} />
            <Highlights highlights={highlights} />

            <div className="py-6 border-b border-neutral-200">
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 mb-4 text-sm">
                Some info has been automatically translated. <button className="a11y-focus underline font-medium">Show original</button>
              </div>
              <div className="relative">
                <p
                  className={`text-neutral-700 leading-relaxed transition-all duration-300 ${!seeMore ? "line-clamp-4" : ""
                    }`}
                >
                  {listing.description}
                </p>

                {!seeMore && (
                  <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white via-white/40 to-transparent" />
                )}
              </div>

              <button
                onClick={() => setSeeMore(!seeMore)}
                className="a11y-focus mt-3 flex items-center gap-1 text-base font-semibold underline"
              >
                {seeMore ? "Show less" : "Show more"}
                <ChevronRight
                  // className={`transition-transform duration-200 ${seeMore ? "rotate-90" : ""
                  //   }`}
                  size={22}
                />
              </button>
            </div>

            <WhereYoullSleep />
            <div id="section-amenities">
              <Amenities amenities={amenities} onShowAll={() => setAmenitiesOpen(true)} />
            </div>

            <Calendar
              checkInDay={18}
              checkOutDay={23}
              nights={listing.nights}
              monthLabel1="October 2026"
              monthLabel2="November 2026"
              year={2026}
              month={9}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingCard
              currency={listing.currency}
              pricePerNight={listing.pricePerNight}
              nights={listing.nights}
              checkIn={listing.checkIn}
              checkOut={listing.checkOut}
              totalBeforeTaxes={listing.totalBeforeTaxes}
              pushDown={subNavVisible}
            />
          </div>
        </div>

        {/* Full-width from here on — booking card's containing block ended above,
            so it naturally stops sticking once its parent grid row is scrolled past */}
        <div className="mt-8">
          <div id="section-reviews">
            <RatingOverview
              rating={listing.rating}
              categories={ratingCategories}
              tags={reviewTags}
              activeTag={activeTag}
              onTagClick={handleTagClick}
            />
            <Reviews
              reviews={reviews}
              reviewCount={listing.reviewCount}
              activeTag={activeTag}
              searchQuery={reviewSearchQuery}
              onSearchChange={setReviewSearchQuery}
            />
          </div>

          <div id="section-location">
            <LocationMap location={listing.location} />
          </div>

          <HostCard host={listing.host} />
          <ThingsToKnow />
          <MoreStaysNearby stays={nearbyStays} currency={listing.currency} />
        </div>
      </main>

      {tourOpen && (
        <PhotoTour
          onClose={() => setTourOpen(false)}
          onOpenLightbox={(i) => setLightboxIndex(i)}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}

      {amenitiesOpen && (
        <AmenitiesModal categories={amenityCategories} onClose={() => setAmenitiesOpen(false)} />
      )}
    </div>
  );
}