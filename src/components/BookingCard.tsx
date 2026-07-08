"use client";

import { Tag, ChevronDown, Flag } from "lucide-react";

interface BookingCardProps {
  currency: string;
  pricePerNight: number;
  nights: number;
  checkIn: string;
  checkOut: string;
  totalBeforeTaxes: number;
  pushDown?: boolean;
}

export default function BookingCard({ currency, pricePerNight, nights, checkIn, checkOut, totalBeforeTaxes, pushDown }: BookingCardProps) {
  return (
    <div
      className="transition-[top] duration-300 ease-out"
      style={{ position: "sticky", top: pushDown ? 115 : 60 }}
    >
      <div className="flex items-center gap-3 border border-neutral-200 rounded-xl px-4 py-3 mb-4 text-sm w-full max-w-sm">
        <Tag size={20} className="text-green-700 shrink-0" fill="currentColor" />
        <div className="flex-1">
          <p>Get 10% off your next stay.</p>
          <button className="a11y-focus underline font-medium">Terms apply</button>
        </div>
        <button className="a11y-focus bg-neutral-100 rounded-lg px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition-colors shrink-0">
          Claim
        </button>
      </div>

      <div className="border border-neutral-200 rounded-2xl shadow-lg p-5 w-full max-w-sm">
        <p className="text-lg mb-4">
          <span className="font-semibold underline">
            {currency}
            {totalBeforeTaxes.toLocaleString()}
          </span>{" "}
          <span className="text-neutral-900 text-base font-normal">for {nights} nights</span>
        </p>

        <div className="border border-neutral-300 rounded-xl overflow-hidden mb-3">
          <div className="grid grid-cols-2">
            <button className="a11y-focus text-left p-3 border-r border-b border-neutral-300 hover:bg-neutral-50 transition-colors">
              <p className="text-[10px] font-semibold uppercase">Check-in</p>
              <p className="text-sm">{checkIn}</p>
            </button>
            <button className="a11y-focus text-left p-3 border-b border-neutral-300 hover:bg-neutral-50 transition-colors">
              <p className="text-[10px] font-semibold uppercase">Checkout</p>
              <p className="text-sm">{checkOut}</p>
            </button>
          </div>
          <button className="a11y-focus w-full text-left p-3 flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div>
              <p className="text-[10px] font-semibold uppercase">Guests</p>
              <p className="text-sm">2 guests</p>
            </div>
            <ChevronDown size={16} />
          </button>
        </div>

        <p className="text-xs text-center bg-neutral-100 rounded-lg py-2.5 text-neutral-700 mb-4">
          Free cancellation before <span className="font-semibold">17 October</span>
        </p>

        <button className="a11y-focus w-full bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white font-medium rounded-[40px] py-3.5 hover:brightness-95 active:scale-[0.99] transition-all">
          Reserve
        </button>

        <p className="text-center text-sm text-neutral-500 mt-3">You won&apos;t be charged yet</p>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-sm text-neutral-700 mt-4">
        <Flag size={14} />
        <span className="underline text-neutral-500">Report this listing</span>
      </button>
    </div>
  );
}
