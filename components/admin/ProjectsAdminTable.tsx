"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";

export type AdminProject = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  video_url?: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string | Date;
  gitRepo?: string;
  liveLink?: string;
  verified?: boolean;
  httpsEnabled?: boolean;
  views?: number;
  loves?: number;
  category?: string[];
  tech?: string[];
  tags?: string[];
  builder?: {
    name?: string;
    email?: string;
    username?: string;
    discordUsername?: string;
    image?: string;
    xLink?: string;
    about?: string;
  };
};

type ExportField = {
  key: string;
  label: string;
  path: string;
};

const EXPORT_FIELDS: ExportField[] = [
  { key: "title", label: "Project Name", path: "title" },
  { key: "slug", label: "Slug", path: "slug" },
  { key: "status", label: "Status", path: "status" },
  { key: "gitRepo", label: "GitHub Link", path: "gitRepo" },
  { key: "liveLink", label: "Live Link", path: "liveLink" },
  { key: "builderUsername", label: "Builder Username", path: "builder.username" },
  { key: "builderName", label: "Builder Name", path: "builder.name" },
  { key: "builderEmail", label: "Builder Email", path: "builder.email" },
  {
    key: "builderDiscordUsername",
    label: "Builder Discord Username",
    path: "builder.discordUsername",
  },
  { key: "category", label: "Category", path: "category" },
  { key: "tech", label: "Tech Stack", path: "tech" },
  { key: "tags", label: "Tags", path: "tags" },
  { key: "verified", label: "Verified", path: "verified" },
  { key: "views", label: "Views", path: "views" },
  { key: "loves", label: "Loves", path: "loves" },
  { key: "createdAt", label: "Created At", path: "createdAt" },
];

const DEFAULT_EXPORT_FIELDS = [
  "title",
  "gitRepo",
  "builderUsername",
  "builderName",
  "status",
];

function getNestedValue(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined,
      obj
    );
}

type ProjectsAdminTableProps = {
  initialProjects: AdminProject[];
};

const ProjectsAdminTable = ({ initialProjects }: ProjectsAdminTableProps) => {
  const [projects, setProjects] = useState<AdminProject[]>(initialProjects);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>(
    DEFAULT_EXPORT_FIELDS
  );
  const [viewingProject, setViewingProject] = useState<AdminProject | null>(
    null
  );
  const viewDialogRef = useRef<HTMLDialogElement>(null);

  const handleView = (project: AdminProject) => {
    setViewingProject(project);
    viewDialogRef.current?.showModal();
  };
  const [statusMap, setStatusMap] = useState<Record<string, string>>(
    Object.fromEntries(
      initialProjects.map((project) => [String(project._id), project.status])
    )
  );

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((project) => {
      return (
        project.title?.toLowerCase().includes(term) ||
        project.builder?.username?.toLowerCase().includes(term) ||
        project.builder?.name?.toLowerCase().includes(term) ||
        project.builder?.discordUsername?.toLowerCase().includes(term) ||
        project.status?.toLowerCase().includes(term)
      );
    });
  }, [projects, search]);

  const toggleField = (key: string) => {
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleExport = () => {
    const fields = EXPORT_FIELDS.filter((field) =>
      selectedFields.includes(field.key)
    );
    const exportData = filteredProjects.map((project) => {
      const row: Record<string, unknown> = {};
      fields.forEach((field) => {
        row[field.key] = getNestedValue(project, field.path);
      });
      return row;
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `projects-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-base-content/70">
          {filteredProjects.length} project
          {filteredProjects.length === 1 ? "" : "s"}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search by title, builder, discord, status..."
            className="input input-sm input-bordered w-64"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
              Export
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-10 menu p-3 shadow bg-base-100 rounded-box w-64 border border-base-300/60 gap-1"
            >
              <p className="text-xs font-semibold text-base-content/60 px-1 pb-1">
                Fields to export
              </p>
              {EXPORT_FIELDS.map((field) => (
                <label
                  key={field.key}
                  className="label cursor-pointer justify-start gap-2 px-1"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    checked={selectedFields.includes(field.key)}
                    onChange={() => toggleField(field.key)}
                  />
                  <span className="text-sm">{field.label}</span>
                </label>
              ))}
              <button
                className="btn btn-sm btn-primary mt-2"
                disabled={selectedFields.length === 0}
                onClick={handleExport}
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
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
            {filteredProjects.map((project) => {
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
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleView(project)}
                      >
                        View
                      </button>
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

      <dialog
        ref={viewDialogRef}
        className="modal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            viewDialogRef.current?.close();
          }
        }}
      >
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {viewingProject ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {viewingProject.title}
                </h3>
                <p className="text-xs text-base-content/60">
                  Created{" "}
                  {new Date(viewingProject.createdAt).toLocaleString()}
                </p>
              </div>

              {viewingProject.thumbnail ? (
                <img
                  src={viewingProject.thumbnail}
                  alt={viewingProject.title}
                  className="w-full rounded-xl border border-base-300/60 object-cover max-h-48"
                />
              ) : null}

              {viewingProject.description ? (
                <p className="text-sm text-base-content/80">
                  {viewingProject.description}
                </p>
              ) : null}

              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                <DetailRow label="Status" value={viewingProject.status} />
                <DetailRow label="Slug" value={viewingProject.slug} />
                <DetailRow
                  label="GitHub"
                  value={viewingProject.gitRepo}
                  href={viewingProject.gitRepo}
                />
                <DetailRow
                  label="Live link"
                  value={viewingProject.liveLink}
                  href={viewingProject.liveLink}
                />
                <DetailRow
                  label="Demo video"
                  value={viewingProject.video_url}
                  href={viewingProject.video_url}
                />
                <DetailRow
                  label="Verified"
                  value={viewingProject.verified ? "Yes" : "No"}
                />
                <DetailRow
                  label="HTTPS enabled"
                  value={viewingProject.httpsEnabled ? "Yes" : "No"}
                />
                <DetailRow
                  label="Views / Loves"
                  value={`${viewingProject.views ?? 0} / ${
                    viewingProject.loves ?? 0
                  }`}
                />
              </div>

              {(viewingProject.category?.length ||
                viewingProject.tech?.length ||
                viewingProject.tags?.length) ? (
                <div className="space-y-2">
                  {viewingProject.category?.length ? (
                    <TagRow label="Category" values={viewingProject.category} />
                  ) : null}
                  {viewingProject.tech?.length ? (
                    <TagRow label="Tech" values={viewingProject.tech} />
                  ) : null}
                  {viewingProject.tags?.length ? (
                    <TagRow label="Tags" values={viewingProject.tags} />
                  ) : null}
                </div>
              ) : null}

              <div className="rounded-xl border border-base-300/60 p-3 space-y-2">
                <p className="text-xs font-semibold text-base-content/60">
                  Builder
                </p>
                <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  <DetailRow label="Name" value={viewingProject.builder?.name} />
                  <DetailRow
                    label="Username"
                    value={viewingProject.builder?.username}
                  />
                  <DetailRow
                    label="Discord"
                    value={viewingProject.builder?.discordUsername}
                  />
                  <DetailRow
                    label="Email"
                    value={viewingProject.builder?.email}
                  />
                  <DetailRow
                    label="X / Twitter"
                    value={viewingProject.builder?.xLink}
                    href={viewingProject.builder?.xLink}
                  />
                </div>
                {viewingProject.builder?.about ? (
                  <p className="text-sm text-base-content/70">
                    {viewingProject.builder.about}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  href,
}: {
  label: string;
  value?: string | null;
  href?: string;
}) => (
  <div>
    <span className="text-xs uppercase tracking-wide text-base-content/50">
      {label}
    </span>
    <div className="truncate">
      {value ? (
        href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="link link-primary"
          >
            {value}
          </a>
        ) : (
          value
        )
      ) : (
        <span className="text-base-content/40">—</span>
      )}
    </div>
  </div>
);

const TagRow = ({ label, values }: { label: string; values: string[] }) => (
  <div>
    <span className="text-xs uppercase tracking-wide text-base-content/50">
      {label}
    </span>
    <div className="mt-1 flex flex-wrap gap-1">
      {values.map((value) => (
        <span key={value} className="badge badge-outline badge-sm capitalize">
          {value}
        </span>
      ))}
    </div>
  </div>
);

export default ProjectsAdminTable;
