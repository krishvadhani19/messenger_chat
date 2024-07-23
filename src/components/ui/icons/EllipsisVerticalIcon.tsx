import { forwardRef } from "react";
import { IconPropsType } from ".";

// eslint-disable-next-line react/display-name
const EllipsisVerticalIcon = forwardRef<HTMLSpanElement, IconPropsType>(
  ({ color, size = 22, className, onClick }, ref) => {
    return (
      <span ref={ref} className={`flex-center ${className}`} onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color || "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </span>
    );
  }
);

export default EllipsisVerticalIcon;
