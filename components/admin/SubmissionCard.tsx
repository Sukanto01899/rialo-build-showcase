"use client";

import React, { useState } from "react";
import DeleteSubmissionButton from "@/components/admin/DeleteSubmissionButton";

type SubmissionCardProps = {
  submission: {
    _id: string;
    projectName: string;
    description: string;
    category?: string[];
    tech?: string[];
    builderXUsername: string;
    discordUsername?: string;
    tags?: string[];
    githubUrl: string;
    liveUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    status?: string;
    createdAt?: string | Date;
  };
};

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-ghost btn-xs"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const SubmissionCard = ({ submission }: SubmissionCardProps) => {
  const createdAt =
    submission.createdAt ? new Date(submission.createdAt) : null;

  const copyAllValue = [
    `Project: ${submission.projectName}`,
    `Description: ${submission.description}`,
    `Builder X: @${submission.builderXUsername}`,
    submission.discordUsername
      ? `Discord: ${submission.discordUsername}`
      : null,
    submission.githubUrl ? `GitHub: ${submission.githubUrl}` : null,
    submission.liveUrl ? `Live: ${submission.liveUrl}` : null,
    submission.imageUrl ? `Image: ${submission.imageUrl}` : null,
    submission.videoUrl ? `Video: ${submission.videoUrl}` : null,
    submission.category?.length
      ? `Category: ${submission.category.join(", ")}`
      : null,
    submission.tech?.length ? `Tech: ${submission.tech.join(", ")}` : null,
    submission.tags?.length ? `Tags: ${submission.tags.join(", ")}` : null,
    submission.status ? `Status: ${submission.status}` : null,
    createdAt ? `Created: ${createdAt.toISOString()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="card-title break-words">
              {submission.projectName}
            </h2>
            <p className="mt-1 text-sm text-base-content/80">
              {submission.description}
            </p>
          </div>
          <CopyButton value={copyAllValue} label="submission details" />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base-content/60">Builder X</span>
            <span className="font-semibold">@{submission.builderXUsername}</span>
            <CopyButton
              value={`@${submission.builderXUsername}`}
              label="builder X username"
            />
          </div>
          {submission.discordUsername ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">Discord</span>
              <span>{submission.discordUsername}</span>
              <CopyButton
                value={submission.discordUsername}
                label="discord username"
              />
            </div>
          ) : null}
          {createdAt ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">Created</span>
              <span>{createdAt.toLocaleString()}</span>
              <CopyButton
                value={createdAt.toISOString()}
                label="created date"
              />
            </div>
          ) : null}
          {submission.status ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">Status</span>
              <span className="badge badge-outline badge-sm capitalize">
                {submission.status}
              </span>
              <CopyButton value={submission.status} label="status" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {submission.category?.length
            ? submission.category.map((item) => (
                <span
                  key={`category-${item}`}
                  className="badge badge-outline badge-sm capitalize"
                >
                  {item}
                </span>
              ))
            : null}
          {submission.tech?.length
            ? submission.tech.map((item) => (
                <span
                  key={`tech-${item}`}
                  className="badge badge-outline badge-sm capitalize"
                >
                  {item}
                </span>
              ))
            : null}
          {submission.tags?.length
            ? submission.tags.map((tag) => (
                <span
                  key={`tag-${tag}`}
                  className="badge badge-outline badge-sm capitalize"
                >
                  {tag}
                </span>
              ))
            : null}
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          {submission.githubUrl ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">GitHub</span>
              <a
                className="link break-all"
                href={submission.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                {submission.githubUrl}
              </a>
              <CopyButton value={submission.githubUrl} label="GitHub URL" />
            </div>
          ) : null}
          {submission.liveUrl ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">Live</span>
              <a
                className="link break-all"
                href={submission.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                {submission.liveUrl}
              </a>
              <CopyButton value={submission.liveUrl} label="Live URL" />
            </div>
          ) : null}
          {submission.imageUrl ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">Image</span>
              <a
                className="link break-all"
                href={submission.imageUrl}
                target="_blank"
                rel="noreferrer"
              >
                {submission.imageUrl}
              </a>
              <CopyButton value={submission.imageUrl} label="Image URL" />
            </div>
          ) : null}
          {submission.videoUrl ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base-content/60">Video</span>
              <a
                className="link break-all"
                href={submission.videoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {submission.videoUrl}
              </a>
              <CopyButton value={submission.videoUrl} label="Video URL" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DeleteSubmissionButton submissionId={submission._id} />
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
