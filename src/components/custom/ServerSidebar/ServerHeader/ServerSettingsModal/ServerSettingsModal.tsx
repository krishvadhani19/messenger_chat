"use client";

import { FormEvent, memo, useCallback, useMemo, useState } from "react";
import "./ServerSettingsModal.scss";
import Modal from "@/components/ui/Modal/Modal";
import CustomImage from "@/components/ui/CustomImage/CustomImage";
import { CrossIcon } from "@/components/ui/Icons";
import FileUploader from "@/components/ui/FileUploader/FileUploader";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/hooks/useUploadThing";
import { APIRequest } from "@/utils/auth-util";
import { CreateServerModalSchema } from "@/server/schemas/CreateServerModalSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { FULL_SERVER_TYPE } from "@/types/types";

type ServerSettingsModalPropsType = {
  isOpen: boolean;
  onClose: (category: null) => void;
  currentServer: FULL_SERVER_TYPE;
};

type ServerSettingsModalSchemaType = z.infer<typeof CreateServerModalSchema>;

const ServerSettingsModal = ({
  isOpen,
  onClose,
  currentServer,
}: ServerSettingsModalPropsType) => {
  const router = useRouter();

  const initialFormData: ServerSettingsModalSchemaType = useMemo(
    () => ({
      serverName: currentServer?.name,
      image: {
        url: currentServer?.imageUrl,
        file: undefined,
      },
    }),
    [currentServer]
  );

  const [formData, setFormData] =
    useState<ServerSettingsModalSchemaType>(initialFormData);

  const { startUpload } = useUploadThing("serverName", {
    onClientUploadComplete: async ([data]) => {
      await APIRequest({
        method: "PATCH",
        url: `/api/servers/server-settings/${currentServer?.id}`,
        data: {
          name: formData?.serverName,
          imageUrl: data?.url,
        },
      });
    },
  });

  const [formErrors, setFormErrors] = useState<
    Partial<ServerSettingsModalSchemaType>
  >({});

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFormErrors({});
  }, [initialFormData]);

  const handleClose = useCallback(() => {
    URL.revokeObjectURL(formData?.image?.url);
    resetForm();
    onClose(null);
  }, [onClose, formData?.image?.url, resetForm]);

  const validateForm = useCallback(() => {
    try {
      CreateServerModalSchema.parse(formData);
      return true;
    } catch (formErr) {
      if (formErr instanceof z.ZodError) {
        const errors: Partial<ServerSettingsModalSchemaType> = {};

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
    (val: string, field: keyof ServerSettingsModalSchemaType) => {
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

  const updateServer = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        if (validateForm()) {
          if (formData?.image?.file) {
            await startUpload([formData?.image?.file as File]);
          } else {
            await APIRequest({
              method: "PATCH",
              url: `/api/servers/server-settings/${currentServer?.id}`,
              data: {
                name: formData?.serverName,
                imageUrl: formData?.image?.url,
              },
            });
          }

          toast.success("Server updated");

          router.refresh();

          // Making API call post cloud upload in its callback
          handleClose();
        }
      } catch (error) {
        toast.error("");
      }
    },
    [
      validateForm,
      formData,
      router,
      handleClose,
      startUpload,
      currentServer?.id,
    ]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form className="server-settings-modal-container" onSubmit={updateServer}>
        <div className="server-settings-modal-title">Customize your server</div>

        <div className="server-settings-modal-sub-title">
          Give your server a personality with a name and an image. Your can
          always change it later.
        </div>

        {formData?.image.url ? (
          <div className="server-settings-modal-image-container">
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

        <Button
          text="Update"
          buttonType="submit"
          isFullWidth={false}
          disabled={
            JSON.stringify(initialFormData) === JSON.stringify(formData)
          }
        />
      </form>
    </Modal>
  );
};

export default memo(ServerSettingsModal);
