import { z } from "zod";

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const CreateServerModalSchema = z.object({
  serverName: z.string().min(1, "Server name is required"),
  image: z.object({
    url: z.string().url("Invalid image URL"),
    file: z.instanceof(File).optional(),
  }),
});
