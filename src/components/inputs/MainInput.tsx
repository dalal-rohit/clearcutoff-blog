"use client";
import React, { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  imageIcon?: string;
  error?: string;
  success?: string;
  variant?: "default" | "error" | "success";
  showIcon?: boolean;
  inputType?: "text" | "number" | "password" | "phone"; // ✅ added phone
  maxLength?: number;
}

const colors = {
  gray: "#6C849D2E",
  lightGray: "#6C849D1F",
  primary: "#0083ff",
  lightPrimary: "rgba(0, 123, 255, 0.1)",
  error: "#dc3545",
  lightError: "rgba(220, 53, 69, 0.1)",
  success: "#28a745",
  lightSuccess: "rgba(40, 167, 69, 0.1)",
  border: "#ced4da",
  text: "#212529",
  placeholder: "#6c757d",
};

const MainInput: React.FC<InputProps> = ({
  label,
  icon,
  imageIcon,
  error,
  success,
  variant = "default",
  showIcon = true,
  inputType = "text",
  maxLength,
  className,
  onChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return colors.error;
    if (success) return colors.success;
    if (variant === "error") return colors.error;
    if (variant === "success") return colors.success;
    if (isFocused) return colors.primary;
    return colors.gray;
  };

  const getBackgroundColor = () => {
    if (error) return colors.lightError;
    if (success) return colors.lightSuccess;
    if (isFocused) return colors.lightPrimary;
    return colors.lightGray;
  };

  // ✅ phone-safe change handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // only digits
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value }, // enforce cleaned value
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const getInputType = () => {
    if (inputType === "phone") return "tel"; // ✅ shows numeric keypad on mobile, no spinners
    if (inputType === "number") return "number";
    return inputType;
  };

  return (
    <div className="">
      {label && (
        <label className="block mb-2 text-base text-gray-900">{label}</label>
      )}

      <div
        className={`flex items-center border-b-2 px-3  py-1.5 transition-colors ${
          className ?? ""
        }`}
        style={{
          borderBottomColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
        }}
      >
        {showIcon && (icon || imageIcon) && (
          <div className="mr-3 flex items-center">
            {icon}
            {imageIcon && (
              <img
                src={imageIcon}
                alt="icon"
                className="w-6 h-6 object-contain"
              />
            )}
          </div>
        )}

        <input
          type={getInputType()}
          inputMode={inputType === "phone" ? "numeric" : undefined} // ✅ mobile numeric keyboard
          maxLength={inputType === "phone" ? maxLength : undefined} // ✅ enforce length in UI
          className="flex-1 text-base text-gray-900 bg-transparent outline-none placeholder-gray-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={inputType === "phone" ? handlePhoneChange : onChange} // ✅ custom handler for phone
          {...rest}
        />
      </div>

      {/* {error && <p className="text-sm text-red-600 mt-1">{error}</p>} */}
      {/* {!error && success && ( */}
        <p className={`text-sm h-5 ${error ? "text-red-600" : "text-green-600"}  mt-1`}>{error || success}</p>
      {/* )} */}
    </div>
  );
};

export default MainInput;
