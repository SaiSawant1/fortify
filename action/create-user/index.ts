"use server";

import { CreateSafeAction } from "@/lib/createSafeAction";
import { InputType, ReturnType } from "./type";
import { prisma } from "@/lib/db";
import { CreateUserSchema } from "./schema";
import bcrypt from "bcryptjs";
import { setSessionCookies } from "@/lib/auth/server";

export async function handler(input: InputType): Promise<ReturnType> {
  let user;
  const hashedPassword = await bcrypt.hash(input.password, 10);
  try {
    user = await prisma.user.create({
      data: {
        name: input.name,
        password: hashedPassword,
        email: input.email,
      },
    });
  } catch (err) {
    return { error: `${err}` };
  }

  await setSessionCookies({ name: user.name, email: user.email, id: user.id });

  return { data: user };
}

export const RegisterUser = CreateSafeAction(CreateUserSchema, handler);
