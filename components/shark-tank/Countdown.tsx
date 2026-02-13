"use client";

import { useEffect, useMemo, useState } from "react";

type CountdownProps = {
  target: string;
  variant?: "inline" | "boxes";
};

const getRemaining = (targetTime: number) => {
  const now = Date.now();
  const diff = Math.max(0, targetTime - now);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return { diff, days, hours, minutes, secs };
};

const Countdown = ({ target, variant = "inline" }: CountdownProps) => {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [remaining, setRemaining] = useState(() => getRemaining(targetTime));

  useEffect(() => {
    if (!targetTime || Number.isNaN(targetTime)) return;
    const interval = setInterval(() => {
      setRemaining(getRemaining(targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  if (!targetTime || Number.isNaN(targetTime)) {
    return <div className="text-sm text-base-content/60">Countdown: TBA</div>;
  }

  if (remaining.diff <= 0) {
    return <div className="text-sm text-base-content/60">Live now</div>;
  }

  if (variant === "boxes") {
    const items = [
      { label: "Days", value: remaining.days },
      { label: "Hours", value: remaining.hours },
      { label: "Mins", value: remaining.minutes },
      { label: "Secs", value: remaining.secs },
    ];
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-base-300/60 bg-base-100/80 px-3 py-3 text-center shadow-sm"
          >
            <div className="text-2xl font-semibold tabular-nums">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-xs uppercase tracking-widest text-base-content/60">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-base-content/70">
      <span className="font-semibold text-base-content">Countdown</span>
      <span>
        {remaining.days}d {String(remaining.hours).padStart(2, "0")}h{" "}
        {String(remaining.minutes).padStart(2, "0")}m{" "}
        {String(remaining.secs).padStart(2, "0")}s
      </span>
    </div>
  );
};

export default Countdown;
