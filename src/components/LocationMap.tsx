import { Search, Plus, Minus, Home, ChevronRight } from "lucide-react";

export default function LocationMap({ location }: { location: string }) {
  return (
    <div className="py-6 border-b border-neutral-200">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">Where you&apos;ll be</h2>
      <p className="text-neutral-700 mb-6">{location}</p>

      {/* Placeholder — swap for a real Google/Mapbox embed; visual approximation only */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-green-50">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 350,0 0,400" fill="#cfe3f0" />
          <polygon points="350,0 800,0 800,400 0,400" fill="#e3ede0" />
          <circle cx="270" cy="230" r="70" fill="#d3e3cf" opacity="0.7" />
          <circle cx="580" cy="300" r="90" fill="#d3e3cf" opacity="0.7" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="400" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 text-white shadow-lg">
          <Home size={20} />
        </div>

        <button aria-label="Search this area" className="a11y-focus absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-neutral-50 transition-colors">
          <Search size={16} />
        </button>

        <div className="absolute top-4 right-4 flex flex-col rounded-lg overflow-hidden shadow-md">
          <button aria-label="Zoom in" className="a11y-focus flex items-center justify-center w-10 h-10 bg-white hover:bg-neutral-50 border-b border-neutral-200 transition-colors">
            <Plus size={16} />
          </button>
          <button aria-label="Zoom out" className="a11y-focus flex items-center justify-center w-10 h-10 bg-white hover:bg-neutral-50 transition-colors">
            <Minus size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-black-500 mt-4 ">Exact location will be provided after booking.</p>

      <h3 className="font-semibold mt-6 mb-2 text-lg">Neighbourhood highlights</h3>
      <p className="text-neutral-800 text-base leading-relaxed">
        Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafes, and popular attractions.
      </p>
      <button className="a11y-focus text-base font-semibold underline mt-3 flex items-center gap-1 mb-4">
        Show more <ChevronRight size={22} />
      </button>
    </div>
  );
}
