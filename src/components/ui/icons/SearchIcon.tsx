import { IconPropsType } from ".";

const SearchIcon = ({
  color,
  size = 22,
  className,
  onClick,
}: IconPropsType) => {
  return (
    <span className={`flex-center ${className}`} onClick={onClick}>
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </span>
  );
};

export default SearchIcon;
