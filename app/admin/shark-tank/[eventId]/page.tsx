import EditSharkTankEventForm from "@/components/admin/EditSharkTankEventForm";
import dbConnect from "@/lib/db";
import SharkTankEvent, { ISharkTankEvent } from "@/model/SharkTankEvent";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Shark Tank Event | Rialo Builder Hub",
};

type AdminSharkTankEditProps = {
  params: Promise<{ eventId: string }>;
};

export default async function AdminSharkTankEditPage({
  params,
}: AdminSharkTankEditProps) {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Edit Shark Tank Event</h1>
        <p className="text-base-content/70">
          Update event details.
        </p>
      </div>

      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <EditSharkTankEventForm event={event as ISharkTankEvent} />
        </div>
      </div>
    </div>
  );
}
