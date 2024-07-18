import { ChanelType } from "@prisma/client";
import { z } from "zod";

export enum ChanelTypeLabelEnum {
  Text = "Text",
  Audio = "Audio",
  Video = "Video",
}

export const CreateChanelModalSchema = z.object({
  chanelName: z.string().min(3, "Chanel name must have at least 3 characters"),
  chanelType: z.object({
    id: z.nativeEnum(ChanelType),
    label: z.nativeEnum(ChanelTypeLabelEnum),
  }),
});
