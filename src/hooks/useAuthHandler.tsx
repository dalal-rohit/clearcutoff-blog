"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuthFlowStore } from "@/store/useAuthFlowStore";

export function useAuthHandler(
  mode: "login" | "register",
) {
  const router = useRouter();
//   const { number, setNumber, goToOtp } = useAuthFlowStore();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [successInput, setSuccessInput] = useState("");
  const [disabled, setDisabled] = useState(true);

//   useEffect(() => {
//     setPhone(number);
//   }, [number]);

  // ✅ Phone validation
  const validatePhone = (value: string) => {
    setPhone(value);
    setSuccessInput("");
    setDisabled(true);

    if (!value) {
      setErrorInput("");
      return;
    }

    if (value.length === 1 && !/[6-9]/.test(value)) {
      setErrorInput("Indian numbers must start with 6, 7, 8, or 9.");
      return;
    }

    if (value.length > 0 && value.length < 10) {
      setErrorInput("Phone number must be 10 digits.");
      return;
    }

    if (/^[6-9]\d{9}$/.test(value)) {
      setErrorInput("");
      setDisabled(false);
      setSuccessInput("Phone number is valid.");
    }
  };



  return {
    phone,
    setPhone,
    isLoading,
    errorInput,
    successInput,
    disabled,
    validatePhone,
  };
}
