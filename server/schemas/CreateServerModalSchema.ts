import { z } from "zod";

export const CreateServerModalSchema = z.object({
  serverName: z
    .string()
    .min(3, "Server name must be at least 3 characters long"),
});
