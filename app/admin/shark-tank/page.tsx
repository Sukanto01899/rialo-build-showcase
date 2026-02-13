import SharkTankEventsTable, {
  AdminSharkTankEvent,
} from "@/components/admin/SharkTankEventsTable";
import dbConnect from "@/lib/db";
import SharkTankEvent from "@/model/SharkTankEvent";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shark Tank Events | Rialo Builder Hub",
};

export const dynamic = "force-dynamic";

export default async function AdminSharkTankPage() {
  await dbConnect();
  const events = await SharkTankEvent.find({}).sort({ createdAt: -1 }).lean();
  const safeEvents: AdminSharkTankEvent[] = events.map((event) => ({
    ...event,
    _id: String(event._id),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Shark Tank Events</h1>
          <p className="text-base-content/70">
            Manage Shark Tank event listings and status.
          </p>
        </div>
        <Link className="btn btn-primary" href="/admin/shark-tank/new">
          Add Event
        </Link>
      </div>

      <SharkTankEventsTable initialEvents={safeEvents} />
    </div>
  );
}
