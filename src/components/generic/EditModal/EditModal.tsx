"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./EditModal.scss";
import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import InputField from "@/components/ui/Input/InputField";
import { z } from "zod";
import {
  ChannelTypeLabelEnum,
  CreateChannelModalSchema,
} from "@/server/schemas/Modals/CreateChannelModalSchema";
import { ChannelType } from "@prisma/client";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Button from "@/components/ui/Button/Button";
import toast from "react-hot-toast";

type CreateChannelPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
  modalHeading: string;
  confirmButtonText: string;
  channelName?: string;
  defaultChannelTypeSelection?: ChannelType;
  confirmChanges: (
    channelName: string,
    channelType: ChannelType
  ) => Promise<void>;
};

type CreateChannelModalSchemaType = z.infer<typeof CreateChannelModalSchema>;

const CHANNEL_TYPE_MAP = {
  TEXT: {
    id: ChannelType.TEXT,
    label: ChannelTypeLabelEnum.Text,
  },
  AUDIO: {
    id: ChannelType.AUDIO,
    label: ChannelTypeLabelEnum.Audio,
  },
  VIDEO: {
    id: ChannelType.VIDEO,
    label: ChannelTypeLabelEnum.Video,
  },
} as const;

type CHANNEL_TYPE_MAP_TYPE =
  (typeof CHANNEL_TYPE_MAP)[keyof typeof CHANNEL_TYPE_MAP];

const CHANNEL_TYPES = Object.values(CHANNEL_TYPE_MAP);

const initialFormData: CreateChannelModalSchemaType = {
  channelName: "",
  channelType: CHANNEL_TYPE_MAP.TEXT,
};

const EditModal = ({
  isOpen,
  onClose,
  modalHeading,
  confirmButtonText,
  channelName,
  defaultChannelTypeSelection,
  confirmChanges,
}: CreateChannelPropsType) => {
  const [formData, setFormData] = useState<CreateChannelModalSchemaType>({
    ...initialFormData,
    ...(channelName && {
      channelName: channelName,
    }),
    ...(defaultChannelTypeSelection && {
      channelType: CHANNEL_TYPE_MAP[defaultChannelTypeSelection],
    }),
  });

  const [formErrors, setFormErrors] =
    useState<Partial<CreateChannelModalSchemaType>>();

  const validateForm = useCallback(() => {
    try {
      CreateChannelModalSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<CreateChannelModalSchemaType> = {};

        // Adding all the errors to formError state
        error.errors.forEach((err) => {
          const path = err.path.join(".");

          if (path === "channelName") {
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

  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const handleFormDataChange = useCallback(
    (
      val: string | CHANNEL_TYPE_MAP_TYPE,
      field: keyof CreateChannelModalSchemaType
    ) => {
      setFormData((prev) => ({ ...prev, [field]: val }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        await confirmChanges(formData?.channelName, formData?.channelType?.id);
      }

      handleClose();
    },
    [confirmChanges, formData, handleClose, validateForm]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="create-channel-container">
        <div className="create-channel-header">{modalHeading}</div>

        <form className="create-channel-form-container" onSubmit={handleSubmit}>
          <InputField
            isRequired
            inputValue={formData?.channelName}
            type="text"
            autoComplete="text"
            label="Channel Name"
            placeholder="Enter channel name"
            errorMessage={formErrors?.channelName}
            onChange={(val: string) => handleFormDataChange(val, "channelName")}
          />

          <Dropdown
            label="Channel Type"
            selectedItem={formData?.channelType}
            allItems={CHANNEL_TYPES}
            handleItemClick={(channel) =>
              handleFormDataChange(channel, "channelType")
            }
          />

          <Button text={confirmButtonText} buttonType="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default memo(EditModal);
