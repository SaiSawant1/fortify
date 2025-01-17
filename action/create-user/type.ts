import { z } from "zod";
import { CreateUserSchema } from "./schema";
import { User } from "@prisma/client";
import { ActionState } from "@/lib/createSafeAction";

export type InputType = z.infer<typeof CreateUserSchema>;

export type ReturnType = ActionState<InputType, User>;
