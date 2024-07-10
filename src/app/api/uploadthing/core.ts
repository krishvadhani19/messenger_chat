import { getCurrentUser } from "@/server/actions/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await getCurrentUser();
  if (!user) throw new UploadThingError("Unauthorized");

  return { userId: user?.id };
};

export const ourFileRouter = {
  serverName: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
