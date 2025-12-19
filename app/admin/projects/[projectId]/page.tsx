import EditProjectForm from "@/components/admin/EditProjectForm";
import dbConnect from "@/lib/db";
import Project, { IProject } from "@/model/Project";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Project | Rialo Builder Hub",
};

type AdminProjectEditProps = {
  params: Promise<{ projectId: string }>;
};

export default async function AdminProjectEditPage({
  params,
}: AdminProjectEditProps) {
  await dbConnect();
  const { projectId } = await params;
  if (!projectId) {
    notFound();
  }
  const decodedId = decodeURIComponent(projectId).trim();
  const isObjectId = /^[a-fA-F0-9]{24}$/.test(decodedId);
  let project = null;

  if (isObjectId) {
    project = await Project.findById(decodedId).lean();
  }

  if (!project) {
    project = await Project.findOne({
      slug: decodedId,
    }).lean();
    if (!project) {
      project = await Project.findOne({ slug: decodedId })
        .collation({ locale: "en", strength: 2 })
        .lean();
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Edit Project</h1>
        <p className="text-base-content/70">
          Update project details and status.
        </p>
      </div>

      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <EditProjectForm project={project as unknown as IProject} />
        </div>
      </div>
    </div>
  );
}
