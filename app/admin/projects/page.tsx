import ProjectsAdminTable, {
  AdminProject,
} from "@/components/admin/ProjectsAdminTable";
import dbConnect from "@/lib/db";
import Project from "@/model/Project";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Rialo Builder Hub",
};

export default async function AdminProjectsPage() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  const safeProjects: AdminProject[] = projects.map((project) => ({
    ...project,
    _id: String(project._id),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-base-content/70">
          Manage published and inactive projects.
        </p>
      </div>

      <ProjectsAdminTable initialProjects={safeProjects} />
    </div>
  );
}
