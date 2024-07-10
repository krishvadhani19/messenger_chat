"use client";

import Modal from "@/components/ui/Modal/Modal";
import React, { FormEvent, memo, useCallback, useState } from "react";
import "./CreateServerModal.scss";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";
import { z } from "zod";
import { CreateServerModalSchema } from "@/server/schemas/CreateServerModalSchema";
import FileUploader from "@/components/ui/FileUploader/FileUploader";

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
  });
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
          if (err.path[0]) {
            errors[err.path[0] as keyof CreateServerModalSchemaType] =
              err.message;
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

  const handleFileUploader = useCallback((url: string) => {}, []);

  const createServer = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        closeServerModal();
      }
    },
    [closeServerModal, validateForm]
  );

  return (
    <Modal isOpen={isServerModalOpen} onClose={closeServerModal}>
      <form className="create-server-modal-container" onSubmit={createServer}>
        <div className="create-server-modal-title">Customize your server</div>

        <div className="create-server-modal-sub-title">
          Give your server a personality with a name and an image. Your can
          always change it later.
        </div>

        <FileUploader
          value=""
          endpoint="serverName"
          onChange={handleFileUploader}
        />

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
