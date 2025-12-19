import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard | Rialo Builder Hub",
};

export default function AdminIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-base-content/70">
          Manage submissions and publish new projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <p className="text-sm text-base-content/70">Submissions</p>
            <h2 className="text-2xl font-semibold">Review queue</h2>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <p className="text-sm text-base-content/70">Projects</p>
            <h2 className="text-2xl font-semibold">Add & publish</h2>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <p className="text-sm text-base-content/70">Moderation</p>
            <h2 className="text-2xl font-semibold">Pending checks</h2>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary">Review Submissions</button>
            <button className="btn btn-secondary">Add Project</button>
            <button className="btn btn-ghost">Open Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}
