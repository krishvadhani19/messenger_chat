"use client";

import { memo, useCallback } from "react";
import "./Button.scss";
import classNames from "classnames";

type ButtonPropsType = {
  text: string;
  onClick?: (value: string) => void;
  isFullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: "primary" | "secondary";
  buttonType?: "submit";
  width?: string;
  customStyle?: { [key: string]: string };
};

const Button = ({
  text,
  onClick,
  isFullWidth = true,
  disabled = false,
  icon,
  type = "primary",
  buttonType,
  width,
  customStyle,
}: ButtonPropsType) => {
  const handleClick = useCallback(
    (e: any) => {
      onClick?.(e?.target?.value);
    },
    [onClick]
  );

  return (
    <button
      className={classNames("button-container", {
        primary: type === "primary",
        secondary: type === "secondary",
        disabled,
        isFullWidth,
      })}
      onClick={handleClick}
      type={buttonType}
      style={{ width: `${width}`, ...customStyle }}
    >
      {text}

      {icon && <span>{icon}</span>}
    </button>
  );
};

export default memo(Button);
