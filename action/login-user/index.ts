"use server";

import { ActionState, CreateSafeAction } from "@/lib/createSafeAction";
import { InputType, ReturnType } from "./type";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { setSessionCookies } from "@/lib/auth/server";
import { LoginUserSchema } from "./schema";

export async function handler(
  input: InputType,
): Promise<ActionState<InputType, ReturnType>> {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
  } catch (err) {
    return { error: `Something went wrong!${err}` };
  }

  if (!user) {
    return { error: "No User was found" };
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (isPasswordValid === false) {
    return { error: `invalid password` };
  }

  await setSessionCookies({ name: user.name, email: user.email, id: user.id });

  return {
    data: { email: user.email, id: user.id, name: user.name },
  } as ActionState<InputType, ReturnType>;
}

export const LoginUser = CreateSafeAction(LoginUserSchema, handler);
