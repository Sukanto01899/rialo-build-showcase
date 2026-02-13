import AddSharkTankEventForm from "@/components/admin/AddSharkTankEventForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Shark Tank Event | Rialo Builder Hub",
};

export default function AdminAddSharkTankEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Add Shark Tank Event</h1>
        <p className="text-base-content/70">
          Create a new Shark Tank event listing.
        </p>
      </div>
      <AddSharkTankEventForm />
    </div>
  );
}
