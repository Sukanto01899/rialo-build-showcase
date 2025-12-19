"use client";

import React, { useState } from "react";
import Link from "next/link";

export type AdminProject = {
  _id: string;
  title: string;
  slug?: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string | Date;
  builder?: {
    username?: string;
  };
};

type ProjectsAdminTableProps = {
  initialProjects: AdminProject[];
};

const ProjectsAdminTable = ({ initialProjects }: ProjectsAdminTableProps) => {
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, string>>(
    Object.fromEntries(
      initialProjects.map((project) => [String(project._id), project.status])
    )
  );

  const handleStatusChange = (id: string, value: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id: string) => {
    const status = statusMap[id];
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setProjects((prev) =>
        prev.map((project) =>
          String(project._id) === id ? data.project : project
        )
      );
    } catch (error) {
      console.error("Update project error:", error);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      setProjects((prev) =>
        prev.filter((project) => String(project._id) !== id)
      );
    } catch (error) {
      console.error("Delete project error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-base-content/70">
        {projects.length} project{projects.length === 1 ? "" : "s"}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-base-300/60">
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const id = String(project._id);
              return (
                <tr key={id}>
                  <td>
                    <div className="font-semibold">{project.title}</div>
                    <div className="text-xs text-base-content/60">
                      {project.builder?.username
                        ? `@${project.builder.username}`
                        : "Unknown builder"}
                    </div>
                  </td>
                  <td>
                    <select
                      className="select select-sm w-full max-w-[150px]"
                      value={statusMap[id]}
                      onChange={(event) =>
                        handleStatusChange(id, event.target.value)
                      }
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="text-sm text-base-content/60">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {project.slug ? (
                        <Link
                          className="btn btn-sm btn-ghost"
                          href={`/admin/projects/${project.slug}`}
                        >
                          Edit
                        </Link>
                      ) : (
                        <button className="btn btn-sm btn-ghost" disabled>
                          Edit
                        </button>
                      )}
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

export default ProjectsAdminTable;
