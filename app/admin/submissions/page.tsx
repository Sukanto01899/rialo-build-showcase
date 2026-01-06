import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
import { Metadata } from "next";
import DeleteSubmissionButton from "@/components/admin/DeleteSubmissionButton";

export const metadata: Metadata = {
  title: "Admin Submissions | Rialo Builder Hub",
};

export default async function AdminSubmissionsPage() {
  await dbConnect();
  const submissions = await Submission.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Project Submissions</h1>
        <p className="text-base-content/70">
          {submissions.length} submission{submissions.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {submissions.map((submission) => (
          <div
            key={String(submission._id)}
            className="card bg-base-200 shadow-sm"
          >
            <div className="card-body">
              <div className="flex flex-col gap-3">
                  <div>
                    <h2 className="card-title break-words">
                      {submission.projectName}
                    </h2>
                    <p className="mt-1 text-sm text-base-content/80">
                      {submission.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span>
                      Builder X:{" "}
                      <span className="font-semibold">
                        @{submission.builderXUsername}
                      </span>
                    </span>
                    {submission.discordUsername ? (
                      <span>Discord: {submission.discordUsername}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {submission.category?.length ? (
                      submission.category.map((item) => (
                        <span
                          key={`category-${item}`}
                          className="badge badge-outline badge-sm capitalize"
                        >
                          {item}
                        </span>
                      ))
                    ) : null}
                    {submission.tech?.length ? (
                      submission.tech.map((item) => (
                        <span
                          key={`tech-${item}`}
                          className="badge badge-outline badge-sm capitalize"
                        >
                          {item}
                        </span>
                      ))
                    ) : null}
                    {submission.tags?.length ? (
                      submission.tags.map((tag) => (
                        <span
                          key={`tag-${tag}`}
                          className="badge badge-outline badge-sm capitalize"
                        >
                          {tag}
                        </span>
                      ))
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {submission.githubUrl ? (
                      <a
                        className="link"
                        href={submission.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {submission.liveUrl ? (
                      <a
                        className="link"
                        href={submission.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live
                      </a>
                    ) : null}
                    {submission.imageUrl ? (
                      <a
                        className="link"
                        href={submission.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Image
                      </a>
                    ) : null}
                    <DeleteSubmissionButton
                      submissionId={String(submission._id)}
                    />
                  </div>
                  {!submission.imageUrl ? (
                    <div className="mt-2 flex h-24 items-center justify-center rounded-lg bg-base-300 px-4 text-center text-sm font-semibold uppercase tracking-wide text-base-content/80">
                      {submission.projectName}
                    </div>
                  ) : null}
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
