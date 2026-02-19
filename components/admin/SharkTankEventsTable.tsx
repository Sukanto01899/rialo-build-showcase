"use client";

import React, { useState } from "react";
import Link from "next/link";

export type AdminSharkTankEvent = {
  _id: string;
  title: string;
  createdAt: string | Date;
};

type SharkTankEventsTableProps = {
  initialEvents: AdminSharkTankEvent[];
};

const SharkTankEventsTable = ({
  initialEvents,
}: SharkTankEventsTableProps) => {
  const [events, setEvents] = useState<AdminSharkTankEvent[]>(initialEvents);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
    if (!value) return "--";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "--";
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
              <th>Created</th>
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
                  <td className="text-sm text-base-content/60">
                    {formatDate(event.createdAt)}
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
