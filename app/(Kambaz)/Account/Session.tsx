"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
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
        dispatch(setCurrentUser(null));
      } else {
        console.error("Error fetching profile:", err);
      }
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div>Loading...</div>;  // Optional: show loading state
  }

  return <>{children}</>;
}