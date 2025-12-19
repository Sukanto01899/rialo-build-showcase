import AddProjectForm from "@/components/admin/AddProjectForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Project | Rialo Builder Hub",
};

export default function AdminAddProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Add Project</h1>
        <p className="text-base-content/70">
          Publish an approved project directly to the showcase.
        </p>
      </div>

      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
