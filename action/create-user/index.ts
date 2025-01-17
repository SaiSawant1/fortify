"use server";

import { CreateSafeAction } from "@/lib/createSafeAction";
import { InputType, ReturnType } from "./type";
import { prisma } from "@/lib/db";
import { CreateUserSchema } from "./schema";

export async function handler(input: InputType): Promise<ReturnType> {
  let user;
  try {
    user = await prisma.user.create({
      data: {
        name: input.name,
        password: input.password,
        email: input.email,
      },
    });
  } catch (err) {
    return { error: `${err}` };
  }

  return { data: user };
}

export const RegisterUser = CreateSafeAction(CreateUserSchema, handler);
