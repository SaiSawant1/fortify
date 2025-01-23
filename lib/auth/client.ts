"use client";

import { UserSessionType } from "@/schema/auth";
import { useEffect, useState } from "react";

export function useUserSession() {
  const [session, setSession] = useState<UserSessionType | undefined>();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/get-session").then((res) => {
      res.json().then((value) => {
        if (value.error) {
          setError(error);
        }
        setSession(value);
      });
    });
  }, [error]);

  return { session, error };
}
