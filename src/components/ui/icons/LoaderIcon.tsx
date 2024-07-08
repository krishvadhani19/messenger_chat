import { IconPropsType } from ".";

const LoaderIcon = ({
  color,
  size = 22,
  className,
  onClick,
}: IconPropsType) => {
  return (
    <span className={`flex-center ${className}`} onClick={onClick}>
      <svg
        width={size}
        height={size}
        fill="none"
        stroke={color || "currentColor"}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2v4"></path>
        <path d="M12 18v4"></path>
        <path d="m4.93 4.93 2.83 2.83"></path>
        <path d="m16.24 16.24 2.83 2.83"></path>
        <path d="M2 12h4"></path>
        <path d="M18 12h4"></path>
        <path d="m4.93 19.07 2.83-2.83"></path>
        <path d="m16.24 7.76 2.83-2.83"></path>
      </svg>
    </span>
  );
};

export default LoaderIcon;
