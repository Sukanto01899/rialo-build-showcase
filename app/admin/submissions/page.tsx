import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

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

      <div className="grid grid-cols-1 gap-4">
        {submissions.map((submission) => (
          <div
            key={String(submission._id)}
            className="card bg-base-200 shadow-sm"
          >
            <div className="card-body">
              <div className="flex flex-col gap-2">
                <h2 className="card-title">{submission.projectName}</h2>
                <p className="text-sm text-base-content/80">
                  {submission.description}
                </p>
                <div className="text-sm">
                  Builder X:{" "}
                  <span className="font-semibold">
                    @{submission.builderXUsername}
                  </span>
                </div>
                {submission.discordUsername ? (
                  <div className="text-sm">
                    Discord: {submission.discordUsername}
                  </div>
                ) : null}
                {submission.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {submission.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-outline badge-sm capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-4 text-sm">
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
                </div>
                {submission.imageUrl ? (
                  <img
                    src={submission.imageUrl}
                    alt={submission.projectName}
                    className="mt-2 h-48 w-full rounded-lg object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
