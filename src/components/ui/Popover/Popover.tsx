"use client";

import MUIPopover, { PopoverOrigin } from "@mui/material/Popover";
import {
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";

interface PopoverPropsType {
  children: (handleClose: () => void) => ReactNode;
  anchorRef: RefObject<HTMLElement>;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

const Popover = ({
  children,
  anchorRef,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "center",
  },
}: PopoverPropsType) => {
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    if (anchorRef && anchorRef?.current) {
      anchorRef.current.onclick = () => {
        setAnchorEl(anchorRef?.current);
      };
    }
  }, [anchorRef]);

  const open = Boolean(anchorEl);

  return (
    <MUIPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      className="popover-cont"
    >
      {children?.(handleClose)}
    </MUIPopover>
  );
};

export default memo(Popover);
