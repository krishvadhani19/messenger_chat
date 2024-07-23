"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./EditModal.scss";
import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import InputField from "@/components/ui/Input/InputField";
import { z } from "zod";
import {
  ChanelTypeLabelEnum,
  CreateChanelModalSchema,
} from "@/server/schemas/Modals/CreateChanelModalSchema";
import { ChanelType } from "@prisma/client";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Button from "@/components/ui/Button/Button";
import toast from "react-hot-toast";

type CreateChannelPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
  modalHeading: string;
  confirmButtonText: string;
  channelName?: string;
  defaultChannelTypeSelection?: ChanelType;
  confirmChanges: (
    channelName: string,
    chanelType: ChanelType
  ) => Promise<void>;
};

type CreateChannelModalSchemaType = z.infer<typeof CreateChanelModalSchema>;

const CHANNEL_TYPE_MAP = {
  TEXT: {
    id: ChanelType.TEXT,
    label: ChanelTypeLabelEnum.Text,
  },
  AUDIO: {
    id: ChanelType.AUDIO,
    label: ChanelTypeLabelEnum.Audio,
  },
  VIDEO: {
    id: ChanelType.VIDEO,
    label: ChanelTypeLabelEnum.Video,
  },
} as const;

type CHANNEL_TYPE_MAP_TYPE =
  (typeof CHANNEL_TYPE_MAP)[keyof typeof CHANNEL_TYPE_MAP];

const CHANEL_TYPES = Object.values(CHANNEL_TYPE_MAP);

const initialFormData: CreateChannelModalSchemaType = {
  chanelName: "",
  chanelType: CHANNEL_TYPE_MAP.TEXT,
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
  const [formData, setFormData] =
    useState<CreateChannelModalSchemaType>(initialFormData);
  const [formErrors, setFormErrors] =
    useState<Partial<CreateChannelModalSchemaType>>();

  const validateForm = useCallback(() => {
    try {
      CreateChanelModalSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<CreateChannelModalSchemaType> = {};

        // Adding all the errors to formError state
        error.errors.forEach((err) => {
          const path = err.path.join(".");

          if (path === "chanelName") {
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
        await confirmChanges(formData?.chanelName, formData?.chanelType?.id);
      }

      handleClose();
    },
    [confirmChanges, formData, handleClose, validateForm]
  );

  useEffect(() => {
    if (isOpen) {
      console.log("render");
      setFormData({
        ...initialFormData,
        ...(channelName && {
          chanelName: channelName,
        }),
        ...(defaultChannelTypeSelection && {
          chanelType: CHANNEL_TYPE_MAP[defaultChannelTypeSelection],
        }),
      });
    }
  }, [channelName, defaultChannelTypeSelection, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="create-chanel-container">
        <div className="create-chanel-header">{modalHeading}</div>

        <form className="create-chanel-form-container" onSubmit={handleSubmit}>
          <InputField
            isRequired
            inputValue={formData?.chanelName}
            type="text"
            autoComplete="text"
            label="Chanel Name"
            placeholder="Enter chanel name"
            errorMessage={formErrors?.chanelName}
            onChange={(val: string) => handleFormDataChange(val, "chanelName")}
          />

          <Dropdown
            label="Chanel Type"
            selectedItem={formData?.chanelType}
            allItems={CHANEL_TYPES}
            handleItemClick={(chanel) =>
              handleFormDataChange(chanel, "chanelType")
            }
          />

          <Button text={confirmButtonText} buttonType="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default memo(EditModal);
