"use server";

import { InputType, ReturnType } from "./type";
import { prisma } from "@/lib/db";

export async function handler(input: InputType): Promise<ReturnType | Error> {
  let user;
  try {
    user = prisma.user.create({
      data: {
        name: input.name,
        password: input.password,
        email: input.email,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return user;
}
