"use client";

import React, { memo, useCallback } from "react";
import "./FileUploader.scss";
import { UploadIcon } from "../Icons";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

type FileUploaderPropsType = {
  maxFiles: number;
  fileUploadCallback: (inputImage: File) => void;
};

const FileUploader = ({
  maxFiles,
  fileUploadCallback,
}: FileUploaderPropsType) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any) => {
      if (fileRejections.length > 0) {
        fileRejections?.[0].errors.forEach((errorItem: any) => {
          toast.error(errorItem?.message);
        });
      }

      fileUploadCallback(acceptedFiles?.[0]);
    },
    [fileUploadCallback]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles,
    multiple: maxFiles !== 1,
    onDrop,
  });

  return (
    <div {...getRootProps({ className: "file-uploader-container" })}>
      <input {...getInputProps()} />
      <UploadIcon size={30} />

      <div className="file-uploader-description ">
        <div className="file-uploader-heading">
          Choose files or drag and drop
        </div>

        <div className="file-uploader-size-limit">Image (4MB)</div>
      </div>
    </div>
  );
};

export default memo(FileUploader);
