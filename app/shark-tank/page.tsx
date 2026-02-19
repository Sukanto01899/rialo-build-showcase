import dbConnect from "@/lib/db";
import SharkTankEvent from "@/model/SharkTankEvent";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shark Tank | Rialo Builder Hub",
  description: "Shark Tank event updates from the Rialo community.",
};

export const dynamic = "force-dynamic";

export default async function SharkTankPage() {
  await dbConnect();

  const events = await SharkTankEvent.find({}).sort({ createdAt: -1 }).lean();

  const formatDate = (value?: Date) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
  };

  const winners = [...events].sort((a, b) => {
    const aWeek = a.weekNumber ?? 0;
    const bWeek = b.weekNumber ?? 0;
    if (aWeek !== bWeek) return bWeek - aWeek;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
  const fallbackWeekMap = new Map<string, number>();
  winners.forEach((event, index) => {
    const fallbackWeek = winners.length - index;
    fallbackWeekMap.set(String(event._id), fallbackWeek);
  });
  const getWeekNumber = (event: (typeof events)[number]) =>
    event.weekNumber ?? fallbackWeekMap.get(String(event._id)) ?? undefined;
  const currentWinner = winners[0];
  const previousWinners = winners.slice(1);

  const renderEventCard = (
    event: (typeof events)[number],
    variant: "previous" | "default" = "default"
  ) => (
    <Link
      key={String(event._id)}
      href={`/shark-tank/${String(event._id)}`}
      className={`card shark-card group ${
        variant === "previous" ? "previous-winner-card" : ""
      }`}
    >
      <div className="card-body space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/70">
          {getWeekNumber(event) ? (
            <span className="badge badge-outline badge-sm">
              Week {getWeekNumber(event)} Winner
            </span>
          ) : (
            <span className="badge badge-outline badge-sm">Winner</span>
          )}
          {event.weekNumber ? (
            <span className="rounded-full border border-base-300/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
              Week {event.weekNumber} Winner
            </span>
          ) : null}
        </div>
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary">
          {event.title}
        </h3>
        <p className="text-sm text-base-content/70 line-clamp-3">
          {event.description}
        </p>
        {event.winnerTitle ? (
          <div className="text-xs text-base-content/70">
            Winner:{" "}
            <span className="font-semibold text-base-content">
              {event.winnerTitle}
            </span>
          </div>
        ) : null}
        <div className="text-xs text-base-content/60 space-y-1">
          {event.hostBy ? <div>Hosted by: {event.hostBy}</div> : null}
          {event.location ? <div>Location: {event.location}</div> : null}
        </div>
      </div>
    </Link>
  );


  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-20 pb-16 space-y-12">
      <section className="relative overflow-hidden rounded-[32px] border border-base-300/60 bg-base-100/60 p-8 md:p-12 lg:p-14 shark-hero pattern-background shark-hero-blur shark-hero-bg">
        <div className="hero-overlay rounded-[32px]"></div>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.32em] text-base-content/70">
              Builder Arena
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                Shark Tank Showcase
              </h1>
              <p className="text-sm text-base-content/80 md:text-base">
                Weekly pitch sessions where founders demo, ships get real-time
                feedback, and the community crowns the most ambitious build.
              </p>
            </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link className="btn btn-primary" href="#upcoming">
            See This Week
          </Link>
              <Link
                className="btn btn-ghost border border-base-300/70"
                href="https://discord.gg/Yk6BHPQnvm"
                target="_blank"
                rel="noreferrer"
              >
                Join Community
              </Link>
            </div>
            <div className="text-sm text-base-content/70">
              Total events:{" "}
              <span className="font-semibold text-base-content">
                {events.length}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-base-content/60">
                This Week's Winner
              </span>
              <span className="shark-pulse" aria-hidden="true"></span>
            </div>
            {currentWinner ? (
              <div className="card shark-card border-base-300/50">
                <div className="card-body space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/70">
                    <span className="badge badge-outline badge-sm weekly-badge">
                      Winner
                    </span>
                    {getWeekNumber(currentWinner) ? (
                      <span className="rounded-full border border-base-300/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                        Week {getWeekNumber(currentWinner)} Winner
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {currentWinner.winnerTitle || currentWinner.title}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      {currentWinner.winnerTagline || currentWinner.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      className="btn btn-primary"
                      href={`/shark-tank/${String(currentWinner._id)}`}
                    >
                      View Winner
                    </Link>
                    {currentWinner.winnerLink ? (
                      <Link
                        className="btn btn-ghost border border-base-300/70"
                        href={currentWinner.winnerLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Project
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-base-300/60 bg-base-100/60 p-6 text-sm text-base-content/70">
                No winners yet. Add the first weekly winner to get started.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Pitch Flow",
            body: "Submit a short deck, demo live, then unlock tailored feedback from the builder jury.",
          },
          {
            title: "Community Vote",
            body: "The audience scores on clarity, traction, and ambition. Winning builds get spotlighted.",
          },
          {
            title: "Growth Track",
            body: "Winners earn follow-up sessions, mentorship access, and community promotion.",
          },
        ].map((item) => (
          <div key={item.title} className="card shark-card">
            <div className="card-body space-y-3">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-base-content/70">{item.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="upcoming" className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">This Week's Winner</h2>
          <p className="text-sm text-base-content/60">
            Latest weekly winner from the community.
          </p>
        </div>
        {currentWinner ? (
          <div className="card shark-card weekly-winner-card">
            <div className="card-body grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/70">
                  <span className="badge badge-outline badge-sm weekly-badge">
                    Winner
                  </span>
                  {getWeekNumber(currentWinner) ? (
                    <span className="rounded-full border border-base-300/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                      Week {getWeekNumber(currentWinner)} Winner
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {currentWinner.winnerTitle || currentWinner.title}
                </h3>
                <p className="text-sm text-base-content/70 md:text-base">
                  {currentWinner.winnerTagline || currentWinner.description}
                </p>
                {currentWinner.winnerBy ? (
                  <div className="text-sm text-base-content/70">
                    Built by: {currentWinner.winnerBy}
                  </div>
                ) : currentWinner.hostBy ? (
                  <div className="text-sm text-base-content/70">
                    Hosted by: {currentWinner.hostBy}
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    className="btn btn-ghost btn-sm border border-base-300/70 hover:border-primary/40"
                    href={`/shark-tank/${String(currentWinner._id)}`}
                  >
                    More Details
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-base-300/50 bg-base-100/70 p-4 text-sm">
                  <div className="text-xs uppercase tracking-widest text-base-content/60">
                    Prize Highlight
                  </div>
                  <div className="mt-2 text-base-content/80">
                    Community crown + spotlight session
                  </div>
                </div>
                <Link
                  className="btn btn-primary w-full"
                  href={
                    currentWinner.winnerLink || "https://discord.gg/Yk6BHPQnvm"
                  }
                  target={currentWinner.winnerLink ? "_blank" : undefined}
                  rel={currentWinner.winnerLink ? "noreferrer" : undefined}
                >
                  {currentWinner.winnerLink ? "Open Project" : "Join Now"}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-base-content/60">
            No weekly winner yet.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">Previous Winners</h2>
          <p className="text-sm text-base-content/60">
            Past weekly winners and their sessions.
          </p>
        </div>
        {previousWinners.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {previousWinners.map((event) => renderEventCard(event, "previous"))}
          </div>
        ) : (
          <p className="text-sm text-base-content/60">
            No previous winners yet.
          </p>
        )}
      </section>
    </div>
  );
}
