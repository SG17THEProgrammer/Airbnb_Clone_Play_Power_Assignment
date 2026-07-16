import Image from "next/image";

interface HostSectionProps {
  host: { name: string; yearsHosting: number; avatar: string };
}

export default function HostSection({ host }: HostSectionProps) {
  return (
    <div className="flex items-center gap-4 py-6 border-b border-neutral-200">
      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
        <Image src={host.avatar} alt={`${host.name}'s profile photo`} fill className="object-cover" sizes="" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Hosted by {host.name}</h2>
        <p className="text-neutral-500 text-sm">{host.yearsHosting} years hosting</p>
      </div>
    </div>
  );
}
