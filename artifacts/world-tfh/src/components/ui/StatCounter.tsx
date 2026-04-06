import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

export function StatCounter({ value, label, suffix = "" }: { value: number; label: string, suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toString();
  };

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 border border-border/50 bg-card/30 backdrop-blur rounded-2xl">
      <div className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-2">
        {formatValue(displayValue)}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
}
