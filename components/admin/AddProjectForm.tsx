"use client";

import React, { useState } from "react";

const AddProjectForm = () => {
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Add project failed");
      }

      setStatus("success");
      setMessage("Project added and published.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage("Unable to add project. Please try again.");
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
          required
        />
        <input
          name="builderUsername"
          type="text"
          className="input w-full"
          placeholder="Builder username"
          required
        />
      </div>
      <textarea
        name="description"
        className="textarea w-full"
        placeholder="Project description"
        required
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="builderName"
          type="text"
          className="input w-full"
          placeholder="Builder name"
        />
        <input
          name="builderEmail"
          type="email"
          className="input w-full"
          placeholder="Builder email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="builderImage"
          type="url"
          className="input w-full"
          placeholder="Builder image URL"
        />
        <input
          name="builderXLink"
          type="url"
          className="input w-full"
          placeholder="Builder X link"
        />
      </div>
      <textarea
        name="builderAbout"
        className="textarea w-full"
        placeholder="Builder bio"
      ></textarea>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          name="category"
          type="text"
          className="input w-full"
          placeholder="Category (comma separated)"
        />
        <input
          name="tech"
          type="text"
          className="input w-full"
          placeholder="Tech stack (comma separated)"
        />
        <input
          name="tags"
          type="text"
          className="input w-full"
          placeholder="Tags (comma separated)"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="gitRepo"
          type="url"
          className="input w-full"
          placeholder="GitHub repo URL"
        />
        <input
          name="liveLink"
          type="url"
          className="input w-full"
          placeholder="Live URL"
        />
      </div>
      <input
        name="thumbnail"
        type="url"
        className="input w-full"
        placeholder="Thumbnail URL"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="label cursor-pointer justify-start gap-2">
          <input name="verified" type="checkbox" className="checkbox" />
          <span className="label-text">Verified</span>
        </label>
        <label className="label cursor-pointer justify-start gap-2">
          <input name="httpsEnabled" type="checkbox" className="checkbox" />
          <span className="label-text">HTTPS enabled</span>
        </label>
        <select name="status" className="select w-full">
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
          {status === "loading" ? "Publishing..." : "Publish Project"}
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

export default AddProjectForm;
