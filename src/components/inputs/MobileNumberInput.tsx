// components/auth/MobileNumberInput.tsx
import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import { PhoneIcon } from "@heroicons/react/20/solid";

interface MobileNumberInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  isLogin?: boolean; // To conditionally render the icon
  label?: string;
}

export function MobileNumberInput({
  value,
  onChange,
  onSubmit,
  error,
  inputRef,
  isLogin = false,
  label = "Mobile Number",
}: MobileNumberInputProps) {
  return (
    <FormControl error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input
        startDecorator={
          isLogin ? (
            <span className="inline-flex items-center gap-1 text-sm text-gray-700">
              <PhoneIcon className="h-4 w-4" /> +91
            </span>
          ) : (
            "+91"
          )
        }
        placeholder="99999 99999"
        variant="plain"
        value={value}
        onChange={onChange}
        type="tel"
        inputMode="numeric"
        slotProps={{
          input: {
            ref: inputRef,
            maxLength: 10,
            pattern: "[0-9]{10}",
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmit?.();
              }
            },
          },
        }}
        sx={{
          "--Input-radius": "0px",
          borderBottom: "2px solid",
          borderColor: "neutral.outlinedBorder",
          "&:hover": { borderColor: "neutral.outlinedHoverBorder" },
          "&::before": {
            border: "1px solid var(--Input-focusedHighlight)",
            transform: "scaleX(0)",
            left: 0,
            right: 0,
            bottom: "-2px",
            top: "unset",
            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
            borderRadius: 0,
          },
          "&:focus-within::before": { transform: "scaleX(1)" },
        }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}