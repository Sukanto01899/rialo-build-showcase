"use client";

import React, { useState } from "react";

const AddSharkTankEventForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      title: formData.get("title")?.toString().trim(),
      description: formData.get("description")?.toString().trim(),
      startDate: formData.get("startDate")?.toString().trim(),
      image: formData.get("image")?.toString().trim(),
      hostTwitter: formData.get("hostTwitter")?.toString().trim(),
      hostGithub: formData.get("hostGithub")?.toString().trim(),
      hostBy: formData.get("hostBy")?.toString().trim(),
      websiteLink: formData.get("websiteLink")?.toString().trim(),
      location: formData.get("location")?.toString().trim(),
      status: formData.get("status")?.toString().trim(),
    };

    if (!payload.title || !payload.description || !payload.startDate) {
      setStatus("error");
      setMessage("Title, description, and start date are required.");
      return;
    }

    const optionalUrls = [
      { value: payload.image, label: "Event image URL" },
      { value: payload.websiteLink, label: "Website link" },
    ];
    for (const item of optionalUrls) {
      if (item.value && !isValidUrl(item.value)) {
        setStatus("error");
        setMessage(`${item.label} must be a valid URL.`);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/shark-tank-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Create failed");
      }

      form.reset();
      setStatus("success");
      setMessage("Event created successfully.");
    } catch (error) {
      setStatus("error");
      setMessage("Unable to create event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        type="text"
        className="input w-full"
        placeholder="Event title"
        maxLength={120}
        required
      />
      <textarea
        name="description"
        className="textarea w-full"
        placeholder="Event description"
        maxLength={1200}
        required
      ></textarea>
      <input
        name="image"
        type="url"
        className="input w-full"
        placeholder="Event image URL"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="startDate"
          type="date"
          className="input w-full"
          placeholder="Start date"
          required
        />
        <input
          name="location"
          type="text"
          className="input w-full"
          placeholder="Location / Venue"
          maxLength={120}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="hostBy"
          type="text"
          className="input w-full"
          placeholder="Hosted by"
          maxLength={120}
        />
        <input
          name="hostTwitter"
          type="text"
          className="input w-full"
          placeholder="Host Twitter (handle or link)"
          maxLength={120}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="hostGithub"
          type="text"
          className="input w-full"
          placeholder="Host GitHub (optional)"
          maxLength={120}
        />
        <input
          name="websiteLink"
          type="url"
          className="input w-full"
          placeholder="Website link"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <select name="status" className="select w-full" defaultValue="upcoming">
          <option value="upcoming">Upcoming</option>
          <option value="ended">Ended</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Create Event"}
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

export default AddSharkTankEventForm;
