import Image from "next/image";

const sleepSpaces = [
  { name: "Bedroom", sub: "1 double bed", url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=80" },
  { name: "Living room", sub: "1 sofa", url: "/images/living_room.jpeg" },
];

export default function WhereYoullSleep() {
  return (
    <div className="py-6 border-b border-neutral-200">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Where you&apos;ll sleep</h2>
      <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
        {sleepSpaces.map((s) => (
          <div key={s.name}>
            <div className="relative w-full h-55 rounded-lg overflow-hidden mb-2">
              <Image src={s.url} alt={s.name} fill sizes="200px" className="object-cover" />
            </div>
            <p className="text-sm font-medium">{s.name}</p>
            <p className="text-xs text-neutral-500">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
