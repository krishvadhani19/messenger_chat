import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Name is required",
    })
    .email({
      message: "Email is required",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Minimum 8 characters required",
    }),
});
