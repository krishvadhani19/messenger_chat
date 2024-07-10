import { IconPropsType } from ".";

const UploadIcon = ({
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
        fill={color || "currentColor"}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.203 9.846c-.776-.577-1.767-.973-2.79-1.125-.31-1.837-1.135-3.407-2.405-4.568-1.345-1.233-3.123-1.91-5.008-1.91-1.657 0-3.188.519-4.424 1.502A7.013 7.013 0 0 0 5.452 6.58c-1.403.216-2.677.782-3.628 1.62C.631 9.252 0 10.654 0 12.255c0 1.618.68 3.093 1.912 4.16 1.178 1.017 2.763 1.577 4.463 1.577h4.875v-7.189L9 13.053l-1.06-1.06L12 7.931l4.06 4.06L15 13.053l-2.25-2.25v7.19h5.813c1.469 0 2.808-.413 3.77-1.162C23.424 15.983 24 14.77 24 13.323c0-1.403-.622-2.606-1.797-3.477Z"></path>
        <path d="M12.75 17.992h-1.5v3.77h1.5v-3.77Z"></path>
      </svg>
    </span>
  );
};

export default UploadIcon;
