import * as z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(3, { message: "Minimum 3 characters required" }),
    lastName: z.string().min(3, { message: "Minimum 3 characters required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is required" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
