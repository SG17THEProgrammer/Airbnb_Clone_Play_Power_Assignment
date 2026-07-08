import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount: number;
}

export default function GuestFavoriteBadge({ rating, reviewCount }: Props) {
  return (
    <div className="border border-neutral-200 rounded-xl px-6 py-4 flex items-center gap-6 w-full my-4">
      <div className="flex items-center gap-2 shrink-0">
        <img src="./images/guest_logo.png" alt="guest logo" className=" h-[45px]" />
      </div>

      <div className="w-px self-stretch bg-neutral-200" />

      <p className="text-sm text-neutral-700 flex-1">
        One of the most loved homes on Airbnb, according to guests
      </p>

      <div className="w-px self-stretch bg-neutral-200" />

      <div className="text-center shrink-0">
        <p className="text-lg font-semibold">{rating}</p>
        <div className="flex gap-0.5 justify-center my-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} className="fill-current" />
          ))}
        </div>
      </div>

      <div className="w-px self-stretch bg-neutral-200" />

      <div className="text-center shrink-0">
        <p className="text-lg font-semibold">{reviewCount}</p>
        <p className="text-sm text-neutral-500">Reviews</p>
      </div>
    </div>
  );
}
