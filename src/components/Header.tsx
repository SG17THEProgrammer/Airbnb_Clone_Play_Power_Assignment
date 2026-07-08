import { Search, Globe, Menu, CircleUserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-[95%] mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="/" aria-label="Airbnb Clone home" className="a11y-focus flex items-center text-[#FF385C] font-bold text-2xl shrink-0">
          <img src="./images/bnb_logo.png" alt="bnb_logo" className="h-[60px]" />
          <span className="mt-1 ml-0.5">airbnb</span>
        </a>

        <button className="a11y-focus hidden md:flex items-center border border-neutral-200 rounded-full shadow-sm hover:shadow-md transition-shadow">
          <img
            src="./images/house_logo.png"
            alt="house_logo"
            className="h-[40px] ml-3"
          />

          <span className="text-sm font-semibold px-4 py-2.5">
            Anywhere
          </span>

          <span className="text-sm font-semibold px-4 py-2.5 border-l border-neutral-200">
            Anytime
          </span>

          <span className="flex items-center gap-2 text-sm text-neutral-500 pl-4 pr-2 py-1.5 border-l border-neutral-200">
            Add guests
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF385C] text-white shrink-0">
              <Search size={14} />
            </span>
          </span>
        </button>

        <div className="flex items-center gap-4 shrink-0">
          <button className="a11y-focus hidden lg:block text-sm font-medium rounded-full px-3 py-2.5 hover:bg-neutral-100 transition-colors">
            Become a host
          </button>
          <button aria-label="Change language and region" className="a11y-focus hidden md:flex items-center justify-center w-9 h-9 rounded-full  bg-gray-100 hover:shadow-md transition-shadow">
            <Globe size={16} />
          </button>
          <button className="a11y-focus flex items-center gap-3 border border-neutral-200 rounded-[50%] py-2 px-2 hover:shadow-md transition-shadow bg-gray-100">
            <Menu size={16} />
            {/* <CircleUserRound size={26} className="text-neutral-500" /> */}
          </button>
        </div>
      </div>
    </header>
  );
}
