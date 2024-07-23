"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./CreateChanelModal.scss";
import { FormEvent, memo, useCallback, useState } from "react";
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
import { APIRequest } from "@/utils/auth-util";
import { useParams, useRouter } from "next/navigation";

type CreateChanelPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
  defaultSelection?: ChanelType;
};

type CreateChanelModalSchemaType = z.infer<typeof CreateChanelModalSchema>;

const CHANEL_TYPE_MAP = {
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

type CHANEL_TYPE_MAP_TYPE =
  (typeof CHANEL_TYPE_MAP)[keyof typeof CHANEL_TYPE_MAP];

const CHANEL_TYPES = Object.values(CHANEL_TYPE_MAP);

const initialFormData: CreateChanelModalSchemaType = {
  chanelName: "",
  chanelType: CHANEL_TYPE_MAP.TEXT,
};

const CreateChanelModal = ({
  isOpen,
  onClose,
  defaultSelection,
}: CreateChanelPropsType) => {
  const [formData, setFormData] = useState<CreateChanelModalSchemaType>({
    ...initialFormData,
    ...(defaultSelection && {
      chanelType: CHANEL_TYPE_MAP[defaultSelection],
    }),
  });
  const [formErrors, setFormErrors] =
    useState<Partial<CreateChanelModalSchemaType>>();

  const { serverId } = useParams();
  const router = useRouter();

  const validateForm = useCallback(() => {
    try {
      CreateChanelModalSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<CreateChanelModalSchemaType> = {};

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
      val: string | CHANEL_TYPE_MAP_TYPE,
      field: keyof CreateChanelModalSchemaType
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
              chanelName: formData?.chanelName,
              chanelType: formData?.chanelType?.id,
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
      <div className="create-chanel-container">
        <div className="create-chanel-header">Create Chanel</div>

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

          <Button text="Create" buttonType="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default memo(CreateChanelModal);
