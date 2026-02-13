import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="mx-auto flex w-full flex-col lg:flex-row">
        <aside className="w-full border-b border-base-200 bg-base-200/60 p-6 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Rialo Admin</h2>
            <p className="text-xs uppercase tracking-widest text-base-content/60">
              Dashboard
            </p>
          </div>
          <nav className="space-y-3">
            <Link className="btn btn-ghost justify-start" href="/admin">
              Dashboard
            </Link>
            <Link className="btn btn-ghost justify-start" href="/admin/projects">
              Projects
            </Link>
            <Link className="btn btn-ghost justify-start" href="/admin/shark-tank">
              Shark Tank
            </Link>
            <Link className="btn btn-ghost justify-start" href="/admin/submissions">
              Submissions
            </Link>
            <Link className="btn btn-ghost justify-start" href="/admin/add-project">
              Add Project
            </Link>
          </nav>
          <div className="mt-auto pt-6">
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
