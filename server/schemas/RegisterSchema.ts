import * as z from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().min(3, { message: "Minimum 3 characters required" }),
  lastName: z.string().min(3, { message: "Minimum 3 characters required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Minimum 8 characters required" }),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .min(8, { message: "Minimum 8 characters required" }),
});
