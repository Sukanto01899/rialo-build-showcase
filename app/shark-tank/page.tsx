import dbConnect from "@/lib/db";
import SharkTankEvent from "@/model/SharkTankEvent";
import { Metadata } from "next";
import Link from "next/link";
import Countdown from "@/components/shark-tank/Countdown";

export const metadata: Metadata = {
  title: "Shark Tank | Rialo Builder Hub",
  description: "Shark Tank event updates from the Rialo community.",
};

export const dynamic = "force-dynamic";

export default async function SharkTankPage() {
  await dbConnect();
  const events = await SharkTankEvent.find({}).sort({ createdAt: -1 }).lean();
  const upcoming = events.filter((event) => event.status === "upcoming");
  const ended = events.filter((event) => event.status === "ended");

  const formatDate = (value?: Date) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
  };

  const nextEvent = [...upcoming]
    .filter((event) => event.startDate)
    .sort((a, b) => {
      const aTime = new Date(a.startDate || 0).getTime();
      const bTime = new Date(b.startDate || 0).getTime();
      return aTime - bTime;
    })[0];

  const renderEventCard = (event: (typeof events)[number]) => (
    <Link
      key={String(event._id)}
      href={`/shark-tank/${String(event._id)}`}
      className="card bg-base-100 shadow-sm border border-base-300/60 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="card-body space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
          <span className="badge badge-outline badge-sm capitalize">
            {event.status}
          </span>
          {event.startDate ? (
            <span>Start: {formatDate(event.startDate)}</span>
          ) : null}
        </div>
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-sm text-base-content/70 line-clamp-3">
          {event.description}
        </p>
        <div className="text-xs text-base-content/60 space-y-1">
          {event.hostBy ? <div>Hosted by: {event.hostBy}</div> : null}
          {event.location ? <div>Location: {event.location}</div> : null}
        </div>
      </div>
    </Link>
  );

  const endedLimited = ended.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-24 pb-14 space-y-10">
      <section className="hero min-h-[40vh] rounded-3xl pattern-background">
        <div className="hero-overlay rounded-3xl"></div>
        <div className="hero-content text-center text-base-content">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-base-content/70">
              Community Event
            </div>
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Shark Tank
            </h1>
            <p className="text-sm text-base-content/90 font-semibold md:text-base">
              Weekly pitch sessions and showcases by the Rialo community. See
              what is coming next and revisit past demos.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">Latest Upcoming Event</h2>
          <p className="text-sm text-base-content/60">
            The next weekly Shark Tank session.
          </p>
        </div>
        {nextEvent ? (
          <div className="card border border-base-300/60 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 shadow-sm">
            <div className="card-body grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
                  <span className="badge badge-outline badge-sm capitalize">
                    {nextEvent.status}
                  </span>
                  {nextEvent.startDate ? (
                    <span>Start: {formatDate(nextEvent.startDate)}</span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {nextEvent.title}
                </h3>
                <p className="text-sm text-base-content/70 md:text-base">
                  {nextEvent.description}
                </p>
                {nextEvent.hostBy ? (
                  <div className="text-sm text-base-content/70">
                    Hosted by: {nextEvent.hostBy}
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    className="btn btn-ghost btn-sm border border-base-300/70 hover:border-primary/40"
                    href={`/shark-tank/${String(nextEvent._id)}`}
                  >
                    More Details
                  </Link>
                </div>
              </div>
              {nextEvent.startDate ? (
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-base-content/60">
                    Countdown
                  </div>
                  <Countdown
                    target={new Date(nextEvent.startDate).toISOString()}
                    variant="boxes"
                  />
                  <Link
                    className="btn btn-primary w-full"
                    href="https://discord.gg/monad"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join Now
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-base-content/60">
            No upcoming events right now.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">Ended</h2>
          <p className="text-sm text-base-content/60">
            Showing the latest 5 past events.
          </p>
        </div>
        {endedLimited.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {endedLimited.map(renderEventCard)}
          </div>
        ) : (
          <p className="text-sm text-base-content/60">No ended events yet.</p>
        )}
      </section>
    </div>
  );
}
