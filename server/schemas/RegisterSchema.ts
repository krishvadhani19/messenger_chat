import * as z from "zod";

export const RegsiterSchema = z.object({
  name: z.string().min(3, {
    message: "Minimum 8 characters required",
  }),

  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});
