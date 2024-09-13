import { IconPropsType } from ".";

const PlusIcon = ({
  color,
  size = 22,
  className,
  onClick,
  style,
}: IconPropsType) => {
  return (
    <span
      className={`flex-center ${className}`}
      onClick={onClick}
      style={style}
    >
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
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </span>
  );
};

export default PlusIcon;
