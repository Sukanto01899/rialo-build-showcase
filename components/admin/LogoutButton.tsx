"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } finally {
      setLoading(false);
      router.replace("/admin/login");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline btn-error justify-start"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
