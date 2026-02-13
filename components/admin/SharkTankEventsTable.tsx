"use client";

import React, { useState } from "react";
import Link from "next/link";

export type AdminSharkTankEvent = {
  _id: string;
  title: string;
  status: "upcoming" | "ended";
  startDate?: string | Date;
  createdAt: string | Date;
};

type SharkTankEventsTableProps = {
  initialEvents: AdminSharkTankEvent[];
};

const SharkTankEventsTable = ({
  initialEvents,
}: SharkTankEventsTableProps) => {
  const [events, setEvents] = useState<AdminSharkTankEvent[]>(initialEvents);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, string>>(
    Object.fromEntries(
      initialEvents.map((event) => [String(event._id), event.status])
    )
  );

  const handleStatusChange = (id: string, value: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id: string) => {
    const status = statusMap[id];
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/shark-tank-events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setEvents((prev) =>
        prev.map((event) => (String(event._id) === id ? data.event : event))
      );
    } catch (error) {
      console.error("Update event error:", error);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/shark-tank-events?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      setEvents((prev) => prev.filter((event) => String(event._id) !== id));
    } catch (error) {
      console.error("Delete event error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (value?: string | Date) => {
    if (!value) return "—";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-base-content/70">
        {events.length} event{events.length === 1 ? "" : "s"}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-base-300/60">
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Status</th>
              <th>Start</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const id = String(event._id);
              return (
                <tr key={id}>
                  <td>
                    <div className="font-semibold">{event.title}</div>
                  </td>
                  <td>
                    <select
                      className="select select-sm w-full max-w-[150px]"
                      value={statusMap[id]}
                      onChange={(event) =>
                        handleStatusChange(id, event.target.value)
                      }
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ended">Ended</option>
                    </select>
                  </td>
                  <td className="text-sm text-base-content/60">
                    {formatDate(event.startDate)}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        className="btn btn-sm btn-ghost"
                        href={`/admin/shark-tank/${id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleSave(id)}
                        disabled={savingId === id}
                      >
                        {savingId === id ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(id)}
                        disabled={deletingId === id}
                      >
                        {deletingId === id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SharkTankEventsTable;
