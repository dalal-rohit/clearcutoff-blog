"use client";
import useIsMobile from "@/hooks/isMobile";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import FormHelperText from "@mui/joy/FormHelperText";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthModal } from "@/store/authModalStore";
import { loginUser, verifyOtp } from "@/api/authApi";
// import { logAmplitudeEvent } from "@/services/analytics";
import { disabledButtonStyle } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import MainInput from "../inputs/MainInput";
import { useAuthHandler } from "@/hooks/useAuthHandler";
import OTPInput from "../inputs/OTPInput";
import { CustomBottomSheet, CustomModal } from "../modals-bottom-sheet";
import FreeBadge from "../badge/free-badge";

const apiVerifyOtp = async (phone: string, otp: string) => {
  try {
    const res = await verifyOtp({ phone: phone, otp });

    // Check if API returned success
    if (res.data?.status === "success") {
      return {
        success: true,
        token: res.data.data?.token, // get real token
        user: res.data.data?.user, // optional: return user info
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "OTP verification failed",
      };
    }
  } catch (error: any) {
    console.error("Error verifying OTP:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong",
    };
  }
};

const OTP_LENGTH = 4;

const MotionBox = motion(Box);
export default function AuthFlow() {
  const isMobile = useIsMobile();
  const animationVariants = {
    hidden: { opacity: 0, y: -150, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -150, scale: 0.95 },
  };

  const [resendCount, setResendCount] = useState(0);
  const { isOpen, type, payload, openModal, closeModal } = useAuthModal();

  useEffect(() => {
    // logAmplitudeEvent("Authentication Options Viewed", {
    //   initial_intent: type,
    //   options_available: "phone",
    // });
    // logAmplitudeEvent("Authentication Method Selected", {
    //   auth_method: "phone_otp",
    // });
  }, [type]);

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const {
    phone,
    setPhone,
    // isLoading as isLoginLoading,
    errorInput,
    successInput,
    disabled,
    validatePhone,
  } = useAuthHandler("login");

  const apiSendOtp = async (phone: string) => {
    const data = {
      phone: phone,
      type: type,
    };
    const response = await loginUser(data);
    return { success: true, message: `OTP sent to ${phone}` };
  };

  // --- NEW: Ref for the OTP form element ---
  const otpFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (type === "login" || type === "register") {
          mobileInputRef.current?.focus();
        } else if (type === "otp") {
          otpInputRefs.current[0]?.focus();
        }
      }, 100);
    }
  }, [isOpen, type]);

  useEffect(() => {
    if ((type === "login" || type === "register") && payload.mobileNumber) {
      setPhone(payload.mobileNumber);
    }
    setError(null);
  }, [type, payload.mobileNumber]);

  const sendOtp = async () => {
    setError(null);
    if (phone.length < 10) {
      setError("Number required.");
      return;
    }
    setIsLoading(true);
    try {
      await apiSendOtp(phone);
      openModal({
        type: "otp",
        payload: { mobileNumber: phone, from: type },
      });
      await logAmplitudeEvent("Verification Sent", {
        verification_method: "Number",
        verification_mode: "SMS",
        verification_purpose: type,
      });
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtp();
  };

  useEffect(() => {
    if (successInput) {
      sendOtp();
    }
  }, [successInput]);

  const renderNumberInput = () => {
    return (
      <MainInput
        ref={mobileInputRef}
        label=""
        value={phone}
        placeholder="10-digit number"
        icon={
          <div className="flex gap-1 justify-center items-center -mr-2">
            <Image
              src="/images/indian-flage.webp"
              alt="Indian flag"
              width={24}
              height={24}
              className=""
            />
            <span>+91</span>
          </div>
        }
        error={errorInput}
        success={successInput}
        onChange={(e) => validatePhone(e.target.value)} // ✅ Pass correct event value
        inputType="phone"
        maxLength={10}
      />
    );
  };

  const renderRegister = () => {
    return (
      <form
        onSubmit={handleSendOtp}
        className="flex flex-col gap-8 px-6 md:px-10 py-8"
      >
        <div className="flex flex-col gap-4">
        <FreeBadge />
          <Typography className="heading-large">
            Create a FREE Account!
          </Typography>
          <Typography className="body-medium !font-normal surface-text-gray-muted">
            Already registered?{" "}
            <span
              onClick={() => openModal({ type: "login" })}
              className="!font-semibold text-[#0083ff] cursor-pointer"
            >
              Login
            </span>
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <FormControl error={!!error}>
            <FormLabel className="body-small !font-semibold neutral-blueGrayLight">
              Mobile Number
            </FormLabel>
            {renderNumberInput()}
            {error && (
              <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
            )}
            {/* Show success if exists */}
            {success && (
              <FormHelperText sx={{ color: "green" }}>{success}</FormHelperText>
            )}{" "}
          </FormControl>
          <Button
            size="lg"
            fullWidth
            disabled={disabled}
            type="submit"
            loading={isLoading}
            sx={{
              ...disabledButtonStyle(),
            }}
          >
            Continue
          </Button>
          <Typography className="text-center body-medium !font-normal surface-text-gray-muted">
            By Signing Up, I agree to{" "}
            <Link
              onClick={closeModal}
              href="/terms-and-conditions"
              className=" text-[#0083ff] cursor-pointer"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              onClick={closeModal}
              href="/refund-policy"
              className=" text-[#0083ff] cursor-pointer"
            >
              Privacy Policy
            </Link>
          </Typography>
        </div>
      </form>
    );
  };

  const renderLogin = () => {
    return (
      <form
        onSubmit={handleSendOtp}
        className="flex flex-col gap-6 p-6 md:p-10"
      >
        <div className="flex flex-col gap-6">
          <div>
            <Typography className="heading-large">
              Login to Clear Cutoff
            </Typography>
            <Typography className="body-medium !font-normal">
              Continue your journey with us and clear exam!
            </Typography>
          </div>
          <Typography className="body-medium !font-normal surface-text-gray-muted">
            Not registered already?{" "}
            <span
              onClick={() => openModal({ type: "register" })}
              className="!font-semibold text-[#0083ff] cursor-pointer"
            >
              Sign Up{" "}
            </span>
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <FormControl error={!!error}>
            <FormLabel className="body-small !font-semibold neutral-blueGrayLight">
              Mobile Number
            </FormLabel>

            {renderNumberInput()}
          </FormControl>

          <Button
            disabled={disabled}
            size="lg"
            fullWidth
            type="submit"
            loading={isLoading}
            sx={{
              ...disabledButtonStyle(),
            }}
          >
            Continue Now!
          </Button>
        </div>
      </form>
    );
  };

  const handleCodeFilled = (code: string) => {
    setOtp(code);
    handleVerifyOtp(code);
    setIsDisabled(false);
  };

  const handleVerifyOtp = async (otpCode?: string) => {
    const enteredOtp = otpCode ?? otp; // ✅ fallback to state if no param given
    if (enteredOtp.length < OTP_LENGTH) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }
    setSuccess("");
    setError("");
    setIsLoading(true);
    try {
      const response = await apiVerifyOtp(payload.mobileNumber, enteredOtp);
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message);
      }

      if (response.success) {
        window.location.href = `https://app.clearcutoff.in/login?token=${response.token}`;

        closeModal();
      }
      // closeModal();
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderOTP = () => {
    return (
      // --- MODIFIED: Added the ref to the form element ---
      <form ref={otpFormRef} className="flex flex-col gap-6 p-6 md:p-10">
        <Typography className="heading-large">Verify OTP </Typography>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <Typography className="body-large !font-normal">
              Code sent to @{" "}
              <span className="!font-semibold">+91-{payload.mobileNumber}</span>{" "}
              <span
                onClick={() =>
                  openModal({
                    type: payload.from,
                    payload: { mobileNumber: payload.mobileNumber },
                  })
                }
                className="cursor-pointer !font-semibold   text-[#0083ff] "
              >
                Edit
              </span>
            </Typography>
            <FormControl className="flex flex-col gap-2">
              {/* <FormLabel className="body-small !font-semibold neutral-blueGrayLight">
                Verification Code
              </FormLabel> */}

              <OTPInput
                spaceX={5}
                onCodeFilled={handleCodeFilled}
                error={error}
                success={success}
              />
            </FormControl>
            <Typography className="text-center">
              Didn&apos;t receive code?{" "}
              <span
                onClick={async (e) => {
                  handleSendOtp(e as any);
                  setResendCount((prevCount) => prevCount + 1);
                  // await logAmplitudeEvent("Verification Resent", {
                  //   verification_method: "Number",
                  //   resend_count: resendCount,
                  // });
                }}
                className="cursor-pointer text-[#0083ff]"
              >
                Resend OTP
              </span>
            </Typography>
          </div>
          <Button
            disabled={isDisabled}
            size="lg"
            fullWidth
            type="submit"
            loading={isLoading}
            onClick={() => {
              handleVerifyOtp();
            }}
            sx={{
              ...disabledButtonStyle(),
            }}
          >
            Verify OTP
          </Button>
        </div>
      </form>
    );
  };

  return (
    <AnimatePresence>
      {isOpen &&
        (isMobile ? (
          <CustomBottomSheet isOpen={isOpen} onClose={closeModal}>
            <MotionBox
              role="presentation"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.3 }}
              // sx={{ px: 4, py: 5 }}
            >
              {type === "otp" && renderOTP()}
              {type === "login" && renderLogin()}
              {type === "register" && renderRegister()}
            </MotionBox>
          </CustomBottomSheet>
        ) : (
          <CustomModal
            isHeader={false}
            isOpen={isOpen}
            onClose={() => closeModal()}
          >
            {type === "otp" && renderOTP()}
            {type === "login" && renderLogin()}
            {type === "register" && renderRegister()}
          </CustomModal>
        ))}
    </AnimatePresence>
  );
}
