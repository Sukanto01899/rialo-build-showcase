"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { generateFingerprint } from "@/lib/fingerprint";

interface FingerprintContextType {
  fingerprint: string | null;
  isLoading: boolean;
  error: Error | null;
  refreshFingerprint: () => Promise<void>;
}

const FingerprintContext = createContext<FingerprintContextType | undefined>(
  undefined
);

const STORAGE_KEY = "rialo_fingerprint";

interface FingerprintProviderProps {
  children: ReactNode;
}

export function FingerprintProvider({ children }: FingerprintProviderProps) {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const initFingerprint = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setFingerprint(stored);
        setIsLoading(false);
        return;
      }

      const newFingerprint = await generateFingerprint();

      localStorage.setItem(STORAGE_KEY, newFingerprint);
      setFingerprint(newFingerprint);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to generate fingerprint")
      );
      console.error("Fingerprint error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshFingerprint = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const newFingerprint = await generateFingerprint();
      localStorage.setItem(STORAGE_KEY, newFingerprint);
      setFingerprint(newFingerprint);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to refresh fingerprint")
      );
      console.error("Fingerprint refresh error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initFingerprint();
  }, []);

  return (
    <FingerprintContext.Provider
      value={{
        fingerprint,
        isLoading,
        error,
        refreshFingerprint,
      }}
    >
      {children}
    </FingerprintContext.Provider>
  );
}

export function useFingerprint(): FingerprintContextType {
  const context = useContext(FingerprintContext);

  if (context === undefined) {
    throw new Error("useFingerprint must be used within a FingerprintProvider");
  }

  return context;
}
