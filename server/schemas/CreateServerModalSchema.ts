import { z } from "zod";

export const CreateServerModalSchema = z.object({
  serverName: z.string().min(1, "Server name is required"),
  image: z.object({
    url: z.string().url("Invalid image URL"),
    file: z.instanceof(File).optional(),
  }),
});
