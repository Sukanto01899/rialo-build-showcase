"use client";

import React, { useState } from "react";
import Modal from "./ui/Modal";

const SubmissionForm = () => {
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
      projectName: formData.get("projectName")?.toString().trim(),
      description: formData.get("description")?.toString().trim(),
      builderXUsername: formData.get("builderXUsername")?.toString().trim(),
      discordUsername: formData.get("discordUsername")?.toString().trim(),
      tags: formData.get("tags")?.toString().trim(),
      githubUrl: formData.get("githubUrl")?.toString().trim(),
      liveUrl: formData.get("liveUrl")?.toString().trim(),
      imageUrl: formData.get("imageUrl")?.toString().trim(),
    };

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setMessage("Thanks! Your build was submitted for review.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal>
      <dialog
        id="build_submission"
        className="modal modal-bottom sm:modal-middle "
      >
        <div className="modal-box bg-base-200">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">
              x
            </button>
          </form>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Submit Your Build</h1>
            <p>
              Share your Rialo project with the community! Fill in the details
              below.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <input
              name="projectName"
              type="text"
              className="input validator w-full"
              required
              placeholder="Project name"
            />
            <textarea
              name="description"
              className="textarea w-full"
              required
              placeholder="Project description"
            ></textarea>
            <input
              name="builderXUsername"
              type="text"
              className="input validator w-full"
              required
              placeholder="Builder Twitter/X username"
            />
            <input
              name="discordUsername"
              type="text"
              className="input validator w-full"
              placeholder="Discord username (Optional)"
            />
            <input
              name="tags"
              type="text"
              className="input validator w-full"
              placeholder="Tags (Comma separated)"
            />
            <input
              name="githubUrl"
              type="url"
              className="input validator w-full"
              placeholder="Github URL"
            />
            <input
              name="liveUrl"
              type="url"
              className="input validator w-full"
              placeholder="Live URL"
            />
            <input
              name="imageUrl"
              type="url"
              className="input validator w-full"
              placeholder="Image URL"
            />
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>
            </div>
            {message ? (
              <p
                className={`text-sm ${
                  status === "success" ? "text-success" : "text-error"
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Modal>
  );
};

export default SubmissionForm;
