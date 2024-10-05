import { z } from "zod";

export const ChatAttachmentModalSchema = z.object({
  attachment: z.object({
    url: z.string().url("Invalid image URL"),
    file: z.instanceof(File).optional(),
  }),
});
