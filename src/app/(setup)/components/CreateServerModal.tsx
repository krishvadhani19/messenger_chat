"use client";

import Modal from "@/components/ui/Modal/Modal";
import React, {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import "./CreateServerModal.scss";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";
import { z } from "zod";
import { CreateServerModalSchema } from "@/server/schemas/CreateServerModalSchema";
import FileUploader from "@/components/ui/FileUploader/FileUploader";
import toast from "react-hot-toast";
import { useUploadThing } from "@/hooks/useUploadThing";

type CreateServerModalPropsType = {
  isServerModalOpen: boolean;
  closeServerModal: () => void;
};

type CreateServerModalSchemaType = z.infer<typeof CreateServerModalSchema>;

const CreateServerModal = ({
  isServerModalOpen,
  closeServerModal,
}: CreateServerModalPropsType) => {
  const [formData, setFormData] = useState<CreateServerModalSchemaType>({
    serverName: "",
    image: {
      url: "",
      file: undefined,
    },
  });

  const { startUpload } = useUploadThing("serverName");

  const [formErrors, setFormErrors] = useState<
    Partial<CreateServerModalSchemaType>
  >({});

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

  const handleFileUploader = useCallback((inputFile: File) => {
    const imageUrl = URL.createObjectURL(inputFile);

    setFormData((prev) => ({
      ...prev,
      image: { url: imageUrl, file: inputFile },
    }));
  }, []);

  const createServer = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        startUpload([formData?.image?.file as File]);
        closeServerModal();
      }
    },
    [closeServerModal, validateForm, formData, startUpload]
  );

  return (
    <Modal isOpen={isServerModalOpen} onClose={closeServerModal}>
      <form className="create-server-modal-container" onSubmit={createServer}>
        <div className="create-server-modal-title">Customize your server</div>

        <div className="create-server-modal-sub-title">
          Give your server a personality with a name and an image. Your can
          always change it later.
        </div>

        {formData?.image.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={formData?.image.url} alt="" width={200} height={200} />
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
