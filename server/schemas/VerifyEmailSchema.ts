import * as z from "zod";

export const VerifyEmailSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP has 6 characters",
  }),
});
