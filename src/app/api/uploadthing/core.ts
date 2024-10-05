import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const currentUserId = await getCurrentUserId();

  if (!currentUserId) throw new UploadThingError("Unauthorized");

  return { userId: currentUserId };
};

export const ourFileRouter = {
  serverName: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  chatAttachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
