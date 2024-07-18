"use client";

import Modal from "@/components/ui/Modal/Modal";
import "./CreateChanelModal.scss";
import { memo, useCallback, useState } from "react";
import InputField from "@/components/ui/Input/InputField";
import { z } from "zod";
import {
  ChanelTypeLabelEnum,
  CreateChanelModalSchema,
} from "@/server/schemas/Modals/CreateChanelModalSchema";
import { ChanelType } from "@prisma/client";
import Dropdown from "@/components/ui/Dropdown/Dropdown";

type CreateChanelPropsType = {
  isOpen: boolean;
  onClose: (val: null) => void;
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

const CreateChanelModal = ({ isOpen, onClose }: CreateChanelPropsType) => {
  const [formData, setFormData] =
    useState<CreateChanelModalSchemaType>(initialFormData);

  const handleClose = useCallback(() => {
    onClose(null);
  }, [onClose]);

  const selectChanelType = useCallback((chanel: CHANEL_TYPE_MAP_TYPE) => {
    setFormData((prev) => ({ ...prev, chanelType: chanel }));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="create-chanel-container">
        <div className="create-chanel-header">Create Chanel</div>

        <form className="create-chanel-form-container">
          <InputField
            isRequired
            inputValue={formData?.chanelName}
            label="Chanel Name"
            placeholder="Enter chanel name"
          />

          <Dropdown
            selectedItem={formData?.chanelType}
            allItems={CHANEL_TYPES}
            handleItemClick={selectChanelType}
          />
        </form>
      </div>
    </Modal>
  );
};

export default memo(CreateChanelModal);
