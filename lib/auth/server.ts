import { UserSessionType } from "@/schema/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface CustomJWTPayload extends JwtPayload {
  data: UserSessionType;
}

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

export const verifyToken = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");
  if (token?.value) {
    try {
      jwt.verify(token?.value, process.env.JWT_SECRET!);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

export const getUserSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");
  if (!token) {
    return undefined;
  }
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET!);

  return (decoded as CustomJWTPayload)?.data;
};

export const deleteSessionCookies = async () => {
  (await cookies()).delete("session");
};
