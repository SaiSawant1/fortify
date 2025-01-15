import { z } from "zod";
import { CreateUserSchema } from "./schema";
import { User } from "@prisma/client";

export type InputType = z.infer<typeof CreateUserSchema>;

export type ReturnType = User | undefined;
