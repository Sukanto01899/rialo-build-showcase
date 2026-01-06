import { Metadata } from "next";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
import Project from "@/model/Project";

export const metadata: Metadata = {
  title: "Admin Dashboard | Rialo Builder Hub",
};

export default async function AdminIndex() {
  await dbConnect();
  const [pendingSubmissions, reviewedSubmissions, projects] =
    await Promise.all([
      Submission.countDocuments({ status: "pending" }),
      Submission.countDocuments({ status: "reviewed" }),
      Project.aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

  const projectCounts = projects.reduce(
    (acc, item) => {
      acc[item._id] = item.count;
      return acc;
    },
    {
      approved: 0,
      pending: 0,
      rejected: 0,
    } as Record<string, number>
  );

  const totalSubmissions = pendingSubmissions + reviewedSubmissions;
  const totalProjects =
    projectCounts.approved + projectCounts.pending + projectCounts.rejected;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-base-content/70">
          Manage submissions and publish new projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <p className="text-sm text-base-content/70">Submissions</p>
            <h2 className="text-2xl font-semibold">{pendingSubmissions}</h2>
            <p className="text-sm text-base-content/70">
              Pending of {totalSubmissions}
            </p>
            <Link className="link mt-2 text-sm" href="/admin/submissions">
              Review submissions
            </Link>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <p className="text-sm text-base-content/70">Projects</p>
            <h2 className="text-2xl font-semibold">{projectCounts.approved}</h2>
            <p className="text-sm text-base-content/70">
              Approved of {totalProjects}
            </p>
            <Link className="link mt-2 text-sm" href="/admin/projects">
              Manage projects
            </Link>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <p className="text-sm text-base-content/70">Moderation</p>
            <h2 className="text-2xl font-semibold">
              {projectCounts.pending}
            </h2>
            <p className="text-sm text-base-content/70">Projects pending</p>
            <Link className="link mt-2 text-sm" href="/admin/projects">
              Review pending
            </Link>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/admin/submissions">
              Review submissions
            </Link>
            <Link className="btn btn-secondary" href="/admin/add-project">
              Add project
            </Link>
            <Link className="btn btn-ghost" href="/admin/projects">
              Open projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
