import { IconPropsType } from ".";

const LockIcon = ({ color, size = 22, className, onClick }: IconPropsType) => {
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </span>
  );
};

export default LockIcon;
