"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface ToastProps {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: ToastProps) {
  const [rendered, setRendered] = useState(show);

  useEffect(() => {
    if (show) setRendered(true);
  }, [show]);

  if (!rendered) return null;

  // If this just did {show && <div>...}, the toast would vanish instantly the moment show becomes false — no time for the slide-down CSS animation to play. rendered stays true through the exit animation; only onAnimationEnd (a real DOM event fired when the CSS animation finishes) flips it to false and actually removes the element.

  return (
    <div
      role="status"
      aria-live="polite"
      onAnimationEnd={() => {
        if (!show) setRendered(false);
      }}
      className={`fixed left-1/2 -translate-x-1/2 bottom-8 z-[80] flex items-center gap-2 bg-neutral-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg ${
        show ? "animate-toast-in" : "animate-toast-out"
      }`}
    >
      <Heart size={16} className="fill-white" />
      {message}
    </div>
  );
}
