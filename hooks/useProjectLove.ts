"use clients";

import { useFingerprint } from "@/contexts/FingerprintContext.tsx";
import { useState } from "react";

export function useProjectLove(projectId: string) {
  const { fingerprint, isLoading: fingerprintLoading } = useFingerprint();
  const [loved, setLoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleLove = async () => {
    if (!fingerprint || fingerprintLoading || loading) return;

    setLoading(true);
    try {
      const method = loved ? "DELETE" : "POST";
      const response = await fetch(`/api/projects/${projectId}/love`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: fingerprint }),
      });

      if (response.ok) {
        setLoved(!loved);
      }
    } catch (error) {
      console.error("Failed to toggle love:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loved, loading, toggleLove, fingerprint };
}
