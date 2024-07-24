import { ChannelType } from "@prisma/client";
import { z } from "zod";

export enum ChannelTypeLabelEnum {
  Text = "Text",
  Audio = "Audio",
  Video = "Video",
}

export const CreateChannelModalSchema = z.object({
  channelName: z
    .string()
    .min(3, "Channel name must have at least 3 characters"),
  channelType: z.object({
    id: z.nativeEnum(ChannelType),
    label: z.nativeEnum(ChannelTypeLabelEnum),
  }),
});
