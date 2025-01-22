import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;
