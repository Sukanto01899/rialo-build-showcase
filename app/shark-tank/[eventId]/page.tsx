import dbConnect from "@/lib/db";
import SharkTankEvent from "@/model/SharkTankEvent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Shark Tank Event | Rialo Builder Hub",
};

type SharkTankEventPageProps = {
  params: Promise<{ eventId: string }>;
};

export const dynamic = "force-dynamic";

export default async function SharkTankEventPage({
  params,
}: SharkTankEventPageProps) {
  await dbConnect();
  const { eventId } = await params;
  if (!eventId) {
    notFound();
  }

  const decodedId = decodeURIComponent(eventId).trim();
  const isObjectId = /^[a-fA-F0-9]{24}$/.test(decodedId);
  if (!isObjectId) {
    notFound();
  }

  const event = await SharkTankEvent.findById(decodedId).lean();
  if (!event) {
    notFound();
  }

  const formatDate = (value?: Date) => {
    if (!value) return "TBA";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "TBA";
    return date.toLocaleDateString();
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8 pt-24 pb-14 space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <Link className="btn btn-ghost btn-sm" href="/shark-tank">
          <BiArrowBack />
          Back to Shark Tank
        </Link>
        <span className="badge badge-outline capitalize">{event.status}</span>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-base-300/60 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6 md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-base-content/70">
              Shark Tank Event
            </div>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {event.title}
            </h1>
            <p className="text-sm text-base-content/70 md:text-base">
              {event.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {event.status !== "ended" ? (
                <Link
                  className="btn btn-primary"
                  href="https://discord.gg/monad"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join Now
                </Link>
              ) : null}
              {event.websiteLink ? (
                <a
                  className="btn btn-ghost border border-base-300/70 hover:border-primary/40"
                  href={event.websiteLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              ) : null}
            </div>
          </div>
          {event.image ? (
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-base-300/60 bg-base-100 shadow-md">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-base-300/60 bg-base-100/60 p-8 text-sm text-base-content/60">
              Event artwork will appear here.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Event Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Start Date
            </p>
            <p className="mt-2 text-lg font-semibold">
              {formatDate(event.startDate)}
            </p>
          </div>
          <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Location
            </p>
            <p className="mt-2 text-lg font-semibold">
              {event.location || "TBA"}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Host</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Hosted By
            </p>
            <p className="mt-2 text-lg font-semibold">
              {event.hostBy || "TBA"}
            </p>
          </div>
          <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Host Twitter
            </p>
            {event.hostTwitter ? (
              <a
                className="mt-2 inline-flex text-lg font-semibold text-primary"
                href={
                  event.hostTwitter.startsWith("http")
                    ? event.hostTwitter
                    : `https://x.com/${event.hostTwitter.replace(/^@/, "")}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {event.hostTwitter}
              </a>
            ) : (
              <p className="mt-2 text-lg font-semibold">TBA</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Host GitHub
            </p>
            {event.hostGithub ? (
              <a
                className="mt-2 inline-flex text-lg font-semibold text-primary"
                href={
                  event.hostGithub.startsWith("http")
                    ? event.hostGithub
                    : `https://github.com/${event.hostGithub.replace(/^@/, "")}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {event.hostGithub}
              </a>
            ) : (
              <p className="mt-2 text-lg font-semibold">TBA</p>
            )}
          </div>
          <div className="rounded-2xl border border-base-300/60 bg-base-100 p-5">
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Website
            </p>
            {event.websiteLink ? (
              <a
                className="mt-2 inline-flex text-lg font-semibold text-primary"
                href={event.websiteLink}
                target="_blank"
                rel="noreferrer"
              >
                Visit Website
              </a>
            ) : (
              <p className="mt-2 text-lg font-semibold">TBA</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
