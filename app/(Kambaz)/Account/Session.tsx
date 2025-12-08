"use client";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    try {
      const currentUser = await client.profile();
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
      } else {
        dispatch(setCurrentUser(null));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // If 401 (unauthorized), clear the current user
      if (err.response?.status === 401) {
        // In incognito mode with cross-domain cookies, this is expected
        // The browser blocks third-party cookies, so session can't persist
        dispatch(setCurrentUser(null));
      } else if (err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
        // Network errors - don't clear user, might be temporary
        console.warn("Network error fetching profile, keeping existing session");
      } else {
        console.error("Error fetching profile:", err);
      }
    } finally {
      setPending(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (pending) {
    return <div>Loading...</div>;  // Optional: show loading state
  }

  return <>{children}</>;
}