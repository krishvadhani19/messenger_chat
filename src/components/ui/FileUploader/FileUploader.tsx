"use client";

import React, { memo, useCallback } from "react";
import "./FileUploader.scss";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

type FileUploaderPropsType = {
  endpoint: "serverName" | "messageFile";
  value: string;
  onChange: (url: string) => void;
};

const FileUploader = ({ endpoint, onChange }: FileUploaderPropsType) => {
  const clientUploadCompleteCallback = useCallback(
    (res: any) => {
      onChange(res?.[0].url);
    },
    [onChange]
  );

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={clientUploadCompleteCallback}
    />
  );
};

export default memo(FileUploader);
