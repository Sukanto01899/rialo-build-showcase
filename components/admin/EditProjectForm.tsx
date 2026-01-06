"use client";

import React, { useState } from "react";
import { IProject } from "@/model/Project";

const EditProjectForm = ({ project }: { project: IProject }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      id: String(project._id),
      title: formData.get("title")?.toString().trim(),
      description: formData.get("description")?.toString().trim(),
      thumbnail: formData.get("thumbnail")?.toString().trim(),
      gitRepo: formData.get("gitRepo")?.toString().trim(),
      liveLink: formData.get("liveLink")?.toString().trim(),
      category: formData.get("category")?.toString().trim(),
      tech: formData.get("tech")?.toString().trim(),
      tags: formData.get("tags")?.toString().trim(),
      builderName: formData.get("builderName")?.toString().trim(),
      builderEmail: formData.get("builderEmail")?.toString().trim(),
      builderUsername: formData.get("builderUsername")?.toString().trim(),
      builderImage: formData.get("builderImage")?.toString().trim(),
      builderXLink: formData.get("builderXLink")?.toString().trim(),
      builderAbout: formData.get("builderAbout")?.toString().trim(),
      verified: formData.get("verified") === "on",
      httpsEnabled: formData.get("httpsEnabled") === "on",
      status: formData.get("status")?.toString().trim(),
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      setStatus("success");
      setMessage("Project updated successfully.");
    } catch (error) {
      setStatus("error");
      setMessage("Unable to update project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="title"
          type="text"
          className="input w-full"
          placeholder="Project title"
          defaultValue={project.title?.toString() || ""}
          required
        />
        <input
          name="builderUsername"
          type="text"
          className="input w-full"
          placeholder="Builder username"
          defaultValue={project.builder?.username?.toString() || ""}
          required
        />
      </div>
      <textarea
        name="description"
        className="textarea w-full"
        placeholder="Project description"
        defaultValue={project.description?.toString() || ""}
        required
      ></textarea>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="builderName"
          type="text"
          className="input w-full"
          placeholder="Builder name"
          defaultValue={project.builder?.name?.toString() || ""}
        />
        <input
          name="builderEmail"
          type="email"
          className="input w-full"
          placeholder="Builder email"
          defaultValue={project.builder?.email?.toString() || ""}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="builderImage"
          type="url"
          className="input w-full"
          placeholder="Builder image URL"
          defaultValue={project.builder?.image?.toString() || ""}
        />
        <input
          name="builderXLink"
          type="url"
          className="input w-full"
          placeholder="Builder X link"
          defaultValue={project.builder?.xLink?.toString() || ""}
        />
      </div>
      <textarea
        name="builderAbout"
        className="textarea w-full"
        placeholder="Builder bio"
        defaultValue={project.builder?.about?.toString() || ""}
      ></textarea>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          name="category"
          type="text"
          className="input w-full"
          placeholder="Category (comma separated)"
          defaultValue={(project.category || []).join(", ")}
        />
        <input
          name="tech"
          type="text"
          className="input w-full"
          placeholder="Tech stack (comma separated)"
          defaultValue={(project.tech || []).join(", ")}
        />
        <input
          name="tags"
          type="text"
          className="input w-full"
          placeholder="Tags (comma separated)"
          defaultValue={(project.tags || []).join(", ")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="gitRepo"
          type="url"
          className="input w-full"
          placeholder="GitHub repo URL"
          defaultValue={project.gitRepo?.toString() || ""}
        />
        <input
          name="liveLink"
          type="url"
          className="input w-full"
          placeholder="Live URL"
          defaultValue={project.liveLink?.toString() || ""}
        />
      </div>
      <input
        name="thumbnail"
        type="url"
        className="input w-full"
        placeholder="Thumbnail URL"
        defaultValue={project.thumbnail?.toString() || ""}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            name="verified"
            type="checkbox"
            className="checkbox"
            defaultChecked={Boolean(project.verified)}
          />
          <span className="label-text">Verified</span>
        </label>
        <label className="label cursor-pointer justify-start gap-2">
          <input
            name="httpsEnabled"
            type="checkbox"
            className="checkbox"
            defaultChecked={Boolean(project.httpsEnabled)}
          />
          <span className="label-text">HTTPS enabled</span>
        </label>
        <select
          name="status"
          className="select w-full"
          defaultValue={project.status?.toString() || "approved"}
        >
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Update Project"}
        </button>
        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-success" : "text-error"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default EditProjectForm;
