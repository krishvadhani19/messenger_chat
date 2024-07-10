"use client";

import MUIModal from "@mui/material/Modal";
import { CrossIcon } from "../Icons";
import "./Modal.scss";
import { memo } from "react";

type ModalComponentPropsType = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  closeIcon?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  closeIcon = true,
  ...props
}: ModalComponentPropsType) => {
  return (
    <MUIModal open={isOpen} onClose={onClose} {...props}>
      <div className="modal-container">
        {closeIcon && (
          <CrossIcon className="modal-cross-icon" onClick={onClose} size={18} />
        )}

        {children}
      </div>
    </MUIModal>
  );
};

export default memo(Modal);
