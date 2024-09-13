import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import "./InputField.scss";
import { EyeClose, EyeOpen } from "@/components/ui/Icons";

type InputPropsType = {
  inputValue?: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  inputMode?:
    | "text"
    | "email"
    | "numeric"
    | "search"
    | "tel"
    | "url"
    | "none"
    | "decimal"
    | undefined;
  autoComplete?: string;
  disabled?: boolean;
  errorMessage?: string;
  placeholder?: string;
  isRequired?: boolean;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onEnterKeyPress?: (value: string) => void;
};

const InputField = ({
  inputValue,
  label,
  disabled = false,
  type = "text",
  autoComplete = "",
  icon,
  errorMessage = "",
  placeholder,
  isRequired = false,
  onChange,
  onBlur,
  onEnterKeyPress,
}: InputPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const id = useId();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event?.target?.value;

      if (onChange) {
        onChange?.(val);
      }

      event?.stopPropagation();
    },
    [onChange]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const val = event?.target?.value;
      if (onBlur) {
        onBlur?.(val);
      }

      event?.stopPropagation();
    },
    [onBlur]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const val = (event?.target as HTMLInputElement)?.value;

      if (event?.key === "Enter") {
        onEnterKeyPress?.(val);
        inputRef.current?.blur();
      }

      event?.stopPropagation();
    },
    [onEnterKeyPress]
  );

  const handleInputTypeChange = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const inputType = useMemo(() => {
    if (type === "password" && showPassword) {
      return "text";
    } else if (type === "password" && !showPassword) {
      return "password";
    }

    return type;
  }, [showPassword, type]);

  return (
    <div className="input-field-container">
      {label && (
        <div className="label-container">
          {label}
          {isRequired && <sup style={{ color: "#f43f5e" }}>*</sup>}
        </div>
      )}

      <div className="input-container">
        <input
          id={id}
          className="input-field"
          ref={inputRef}
          type={inputType}
          autoComplete={autoComplete}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
        />

        {icon && <span className="">{icon}</span>}
        {type === "password" && (
          <span onClick={handleInputTypeChange} style={{ cursor: "pointer" }}>
            {showPassword ? <EyeOpen size={18} /> : <EyeClose size={18} />}
          </span>
        )}
      </div>

      {errorMessage && <div className="validation-error">{errorMessage}</div>}
    </div>
  );
};

export default memo(InputField);
