"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./CreateChannelModal.scss";
import { FormEvent, memo, useCallback, useState } from "react";
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
import { APIRequest } from "@/utils/auth-util";
import { useParams, useRouter } from "next/navigation";

type CreateChannelPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
  defaultSelection?: ChannelType;
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

const CreateChannelModal = ({
  isOpen,
  onClose,
  defaultSelection,
}: CreateChannelPropsType) => {
  const [formData, setFormData] = useState<CreateChannelModalSchemaType>({
    ...initialFormData,
    ...(defaultSelection && {
      channelType: CHANNEL_TYPE_MAP[defaultSelection],
    }),
  });
  const [formErrors, setFormErrors] =
    useState<Partial<CreateChannelModalSchemaType>>();

  const { serverId } = useParams();
  const router = useRouter();

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
      try {
        e.preventDefault();

        if (validateForm()) {
          await APIRequest({
            method: "POST",
            url: "/api/channels/create-channel",
            data: {
              serverId,
              channelName: formData?.channelName,
              channelType: formData?.channelType?.id,
            },
          });

          router.refresh();

          handleClose();
        }
      } catch (error) {
        toast.error(
          "Something went wrong while creating server. Please try again!"
        );
      }
    },
    [formData, handleClose, router, serverId, validateForm]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="create-channel-container">
        <div className="create-channel-header">Create Channel</div>

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

          <Button text="Create" buttonType="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default memo(CreateChannelModal);
