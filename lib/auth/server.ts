import { UserSessionType } from "@/schema/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const signtoken = async (payload: UserSessionType): Promise<string> => {
  const token = jwt.sign({ data: payload }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};

export const setSessionCookies = async (payload: UserSessionType) => {
  const token = await signtoken(payload);

  const cookiesStore = await cookies();
  cookiesStore.set("session", token, {
    secure: true,
    httpOnly: true,
    sameSite: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
};

export const deleteSessionCookies = async () => {
  (await cookies()).delete("session");
};
