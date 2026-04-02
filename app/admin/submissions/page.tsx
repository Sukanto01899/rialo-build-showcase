import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
import { Metadata } from "next";
import SubmissionCard from "@/components/admin/SubmissionCard";

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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {submissions.map((submission) => (
          <SubmissionCard
            key={String(submission._id)}
            submission={{
              _id: String(submission._id),
              projectName: submission.projectName,
              description: submission.description,
              category: submission.category,
              tech: submission.tech,
              builderXUsername: submission.builderXUsername,
              discordUsername: submission.discordUsername,
              tags: submission.tags,
              githubUrl: submission.githubUrl,
              liveUrl: submission.liveUrl,
              imageUrl: submission.imageUrl,
              videoUrl: submission.videoUrl,
              status: submission.status,
              createdAt: submission.createdAt,
            }}
          />
        ))}
      </div>
    </div>
  );
}
