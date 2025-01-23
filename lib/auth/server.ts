import { UserSessionType } from "@/schema/auth";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET!);
export const signtoken = async (payload: UserSessionType): Promise<string> => {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h");
  const token = jwt.sign(encodedKey);
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
      jwtVerify(token?.value, encodedKey, { algorithms: ["HS256"] });
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
  const { payload } = await jwtVerify(token.value, encodedKey);

  return payload;
};

export const isAuthenticated = async () => {
  const session = await getUserSession();
  if (session) {
    return true;
  } else {
    return false;
  }
};

export const deleteSessionCookies = async () => {
  (await cookies()).delete("session");
};
