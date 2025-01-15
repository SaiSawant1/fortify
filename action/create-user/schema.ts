import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(5),
  password: z.string().min(8),
});
