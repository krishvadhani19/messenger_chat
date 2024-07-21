import { IconPropsType } from ".";

const CrossIcon = ({
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </span>
  );
};

export default CrossIcon;
