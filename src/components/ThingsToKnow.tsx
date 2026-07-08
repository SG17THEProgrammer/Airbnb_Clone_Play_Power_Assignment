import { CalendarX, ClipboardList, KeyRound , ShieldCheck } from "lucide-react";

const items = [
  {
    icon: CalendarX,
    title: "Cancellation policy",
    body: (<>Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. <br/> Review this host's full policy for details.</>),
  },
  {
    icon: KeyRound ,
    title: "House rules",
    body: (<>Check-in after 2:00 PM <br/> Checkout before 11:00 AM <br /> 3 guests maximum</>),
  },
  {
    icon: ShieldCheck,
    title: "Safety & property",
    body: (<>Carbon monoxide alarm not reported <br /> Smoke alarm not reported <br /> Exterior security cameras on property</>),
  },
];

export default function ThingsToKnow() {
  return (
    <div className="py-8 border-b border-neutral-200">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 tracking-wide">Things to know</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.title}>
            {item.icon === KeyRound ? <item.icon size={30} className="mb-3 scale-x-[-1]" />: <item.icon size={30} className="mb-3" />}
            <p className="font-semibold text-base mb-2">{item.title}</p>
            <p className="text-sm text-black-500 leading-relaxed">{item.body}</p>
            <button className="a11y-focus text-sm underline font-semibold mt-3">Learn more</button>
          </div>
        ))}
      </div>
    </div>
  );
}
