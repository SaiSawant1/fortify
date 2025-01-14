import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(5),
  password: z.string().min(8, {
    message: "Password should be longer than or equal to 8 characters.",
  }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;
