"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

type DeleteSubmissionButtonProps = {
  submissionId: string;
};

const DeleteSubmissionButton = ({
  submissionId,
}: DeleteSubmissionButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this submission? This cannot be undone."
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/submissions?id=${submissionId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Delete submission error:", error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-error btn-outline btn-sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteSubmissionButton;
