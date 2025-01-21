import { z } from "zod";
import { CreateUserSchema } from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { User } from "@prisma/client";

export type InputType = z.infer<typeof CreateUserSchema>;

export type ReturnType = ActionState<InputType, User>;
