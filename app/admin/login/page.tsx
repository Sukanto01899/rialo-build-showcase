import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Rialo Builder Hub",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center bg-base-100 px-6 pt-16">
      <div className="card w-full max-w-md bg-base-200 shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-2xl">Admin Login</h1>
          <p className="text-sm text-base-content/70">
            Enter the admin token to continue.
          </p>
          <form method="POST" action="/api/admin/login" className="space-y-4">
            <input
              name="token"
              type="password"
              className="input w-full"
              placeholder="Admin token"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
