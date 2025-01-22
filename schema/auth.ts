import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(5),
  password: z.string().min(8, {
    message: "Password should be longer than or equal to 8 characters.",
  }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(5, {
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password should be longer than or equal to 8 characters.",
  }),
});

export type signupFormSchemaType = z.infer<typeof signupFormSchema>;

export const UserSessionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().min(1),
});

export type UserSessionType = z.infer<typeof UserSessionSchema>;
