import Image from "next/image";
import { ShieldCheck, Lightbulb, GraduationCap, LucideIcon, CircleCheck } from "lucide-react";
import { coHosts, hostFacts } from "@/data/listing";

interface Host {
  name: string;
  avatar: string;
  yearsHosting: number;
  reviewCount: number;
  hostRating: number;
  responseRate: string;
  responseTime: string;
}

const factIcons: Record<string, LucideIcon> = { Lightbulb, GraduationCap };

export default function HostCard({ host }: { host: Host }) {
  return (
    <div className="py-8 border-b border-neutral-200 mt-4">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 tracking-wide">Meet your host</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 items-start">
        {/* Left: host card + personal facts below it */}

        <div>
          <div className="border border-neutral-200 rounded-2xl p-6 flex items-center gap-6 divide-x divide-neutral-200 shadow-xl">
            <div className="flex flex-col items-center shrink-0 relative px-2">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-neutral-100">
                <Image src={host.avatar} alt={`${host.name}'s profile photo`} fill className="object-cover" />
              </div>

              <span className="absolute bottom-14 right-5 flex items-center justify-center w-8 h-8 rounded-full bg-red-400 border-2 border-white">
                <CircleCheck  size={30} className="fill-[#FF385C] text-white" />
              </span>

              <p className="font-semibold mt-3 text-center">{host.name}</p>
              <p className="text-xs text-neutral-500">Host</p>
            </div>

            <div className="flex-1 divide-y divide-neutral-200">
              <div className="pb-3">
                <p className="text-lg font-semibold">{host.reviewCount.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">Reviews</p>
              </div>

              <div className="py-3">
                <p className="text-lg font-semibold">{host.hostRating}★</p>
                <p className="text-xs text-neutral-500">Rating</p>
              </div>

              <div className="pt-3">
                <p className="text-lg font-semibold">{host.yearsHosting}</p>
                <p className="text-xs text-neutral-500">Years hosting</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {hostFacts.map((fact) => {
              const Icon = factIcons[fact.icon];

              return (
                <div key={fact.text} className="flex items-center gap-3 text-base text-black-700">
                  {Icon && <Icon size={18} />}
                  {fact.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: co-hosts + host details */}
        <div>
          <h3 className="font-semibold mb-4">Co-Hosts</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {coHosts.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                {c.avatar ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={c.avatar}
                      alt={c.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${c.bg}`}
                  >
                    {c.initial}
                  </div>
                )}

                <span className="text-sm">{c.name}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Host details</h3>

          <p className="text-sm text-black-700">
            Response rate: {host.responseRate}
          </p>

          <p className="text-sm text-black-700 mb-4">
            {host.responseTime}
          </p>

          <button className="a11y-focus bg-neutral-100 text-black-900 rounded-lg px-5 py-3 text-sm font-semibold hover:bg-neutral-200 transition-colors">
            Message host
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-2 pt-6">
            <ShieldCheck size={16} />
            To help protect your payment, always use Airbnb to send money and
            communicate with hosts.
          </div>
        </div>
      </div>
    </div>
  );
}