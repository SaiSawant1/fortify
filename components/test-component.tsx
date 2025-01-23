"use client";

import { useUserSession } from "@/lib/auth/client";

export const TestComponent = () => {
  const { session } = useUserSession();
  if (!session) {
    return <div>no session</div>;
  }
  return <div>{session.id}</div>;
};
