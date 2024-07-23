"use client";

import Modal from "@/components/ui/Modal/Modal";
import React, { FormEvent, memo, useCallback, useState } from "react";
import "./CreateServerModal.scss";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";
import { z } from "zod";
import { CreateServerModalSchema } from "@/server/schemas/CreateServerModalSchema";
import FileUploader from "@/components/ui/FileUploader/FileUploader";
import toast from "react-hot-toast";
import { useUploadThing } from "@/hooks/useUploadThing";
import CustomImage from "@/components/ui/CustomImage/CustomImage";
import { CrossIcon } from "@/components/ui/Icons";
import { APIRequest } from "@/utils/auth-util";
import { useRouter } from "next/navigation";
import { Server } from "@prisma/client";

type CreateServerModalPropsType = {
  isServerModalOpen: boolean;
  closeServerModal: () => void;
};

type CreateServerModalSchemaType = z.infer<typeof CreateServerModalSchema>;

const initialFormData: CreateServerModalSchemaType = {
  serverName: "",
  image: {
    url: "",
    file: undefined,
  },
};

const CreateServerModal = ({
  isServerModalOpen,
  closeServerModal,
}: CreateServerModalPropsType) => {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CreateServerModalSchemaType>(initialFormData);

  const { startUpload } = useUploadThing("serverName", {
    onClientUploadComplete: async ([data]) => {
      const newServer: Server = await APIRequest({
        method: "POST",
        url: "/api/servers",
        data: {
          name: formData?.serverName,
          imageUrl: data?.url,
        },
      });

      if (newServer) {
        router.push(`/servers/${newServer.id}`);
      }
    },
  });

  const [formErrors, setFormErrors] = useState<
    Partial<CreateServerModalSchemaType>
  >({});

  const handleClose = useCallback(() => {
    URL.revokeObjectURL(formData?.image?.url);
    closeServerModal();
  }, [closeServerModal, formData?.image?.url]);

  const validateForm = useCallback(() => {
    try {
      CreateServerModalSchema.parse(formData);
      return true;
    } catch (formErr) {
      if (formErr instanceof z.ZodError) {
        const errors: Partial<CreateServerModalSchemaType> = {};

        formErr.errors.forEach((err) => {
          const path = err.path.join(".");

          if (path === "serverName") {
            errors[path] = err.message;
          } else {
            toast.error(err.message);
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  }, [formData]);

  const handleFormChange = useCallback(
    (val: string, field: keyof CreateServerModalSchemaType) => {
      setFormData((prev) => {
        return { ...prev, [field]: val };
      });
    },
    []
  );

  const removeImage = useCallback(() => {
    URL.revokeObjectURL(formData?.image?.url);
    setFormData((prev) => ({
      ...prev,
      image: {
        url: "",
        file: undefined,
      },
    }));
  }, [formData?.image?.url]);

  const handleFileUploader = useCallback((inputFile: File) => {
    const imageUrl = URL.createObjectURL(inputFile);

    setFormData((prev) => ({
      ...prev,
      image: { url: imageUrl, file: inputFile },
    }));
  }, []);

  const createServer = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        if (validateForm()) {
          await startUpload([formData?.image?.file as File]);

          router.refresh();

          // Making API call post cloud upload in its callback
          handleClose();
        }
      } catch (error) {
        toast.error(
          "Something went wrong while creating server. Please try again!"
        );
      }
    },
    [validateForm, startUpload, formData?.image?.file, router, handleClose]
  );

  return (
    <Modal isOpen={isServerModalOpen} onClose={handleClose}>
      <form className="create-server-modal-container" onSubmit={createServer}>
        <div className="create-server-modal-title">Customize your server</div>

        <div className="create-server-modal-sub-title">
          Give your server a personality with a name and an image. Your can
          always change it later.
        </div>

        {formData?.image.url ? (
          <div className="create-server-modal-image-container">
            <CustomImage
              url={formData?.image?.url}
              alt=""
              width={70}
              height={70}
            />

            <CrossIcon
              className="image-cross-icon"
              size={16}
              onClick={removeImage}
            />
          </div>
        ) : (
          <FileUploader maxFiles={1} fileUploadCallback={handleFileUploader} />
        )}

        <InputField
          isRequired
          type="text"
          label="SERVER NAME"
          inputValue={formData?.serverName}
          errorMessage={formErrors.serverName}
          placeholder="Enter server name"
          onChange={(val: string) => handleFormChange(val, "serverName")}
        />

        <Button text="Create" buttonType="submit" isFullWidth={false} />
      </form>
    </Modal>
  );
};

export default memo(CreateServerModal);
