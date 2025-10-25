"use client"
import React from 'react'
import { CustomBottomSheet, CustomModal } from '../modals-bottom-sheet'
import useIsMobile from '@/hooks/isMobile'
import Link from 'next/link'
// import { error } from 'console'
import { MobileNumberInput } from '../inputs/MobileNumberInput'
import FreeBadge from '../badge/free-badge'
import { Button, FormControl, FormHelperText, FormLabel, Typography } from '@mui/joy'
import Image from 'next/image'

function TitleBlock() {
  return (
    <div>
      <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Create a FREE Account!</h2>
      <div className="mt-1 text-sm text-gray-600">
        Already registered? <Link className="text-blue-600 font-semibold" href="#">Login</Link>
      </div>
    </div>
  )
}


function ContinueButton({ enabled, onClick }: { enabled: boolean; onClick?: () => void }) {
  return (
    <Button
      onClick={onClick}
      size='lg'
      fullWidth
    >
      Continue
    </Button>
  )
}

function TermsText() {
  return (
    <p className="mt-4 text-center text-xs text-gray-500">
      By Signing Up, I agree to <Link href="#" className="text-blue-600 font-semibold">Terms & Conditions</Link>{' '}
      and <Link href="#" className="text-blue-600 font-semibold">Privacy Policy</Link>
    </p>
  )
}

function FormContent() {
  const [phone, setPhone] = React.useState('')
  const isValid = /^[6-9][0-9]{9}$/.test(phone)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    // await sendOtp();
  };

  const renderNumberInput = () => {
    return (
      <MobileNumberInput
        // ref={mobileInputRef}
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
        // error={errorInput}
        // success={successInput}
        // onChange={(e) => validatePhone(e.target.value)} // ✅ Pass correct event value
        inputType="phone"
        maxLength={10}
      />
    );
  };

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
            // onClick={() => openModal({ type: "login" })}
            className="!font-semibold text-[#0083ff] cursor-pointer"
          >
            Login
          </span>
        </Typography>
      </div>
      <div className="flex flex-col gap-4">
        <FormControl>
          <FormLabel className="body-small !font-semibold neutral-blueGrayLight">
            Mobile Number
          </FormLabel>
          {renderNumberInput()}
          {/* {error && (
            <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
          )}
          {/* Show success if exists */}
          {/* {success && (
            <FormHelperText sx={{ color: "green" }}>{success}</FormHelperText>
          )}{" "} */}
        </FormControl>
        <Button
          size="lg"
          fullWidth
          // disabled={disabled}
          type="submit"
        // loading={isLoading}
        // sx={{
        //   ...disabledButtonStyle(),
        // }}
        >
          Continue
        </Button>
        <Typography className="text-center body-medium !font-normal surface-text-gray-muted">
          By Signing Up, I agree to{" "}
          <Link
            // onClick={closeModal}
            href="/terms-and-conditions"
            className=" text-[#0083ff] cursor-pointer"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            // onClick={closeModal}
            href="/refund-policy"
            className=" text-[#0083ff] cursor-pointer"
          >
            Privacy Policy
          </Link>
        </Typography>
      </div>
    </form>
  )
}

export default function RegisterModal() {
  const isMobile = useIsMobile()
  return (
    <div>
      {isMobile ? (
        <CustomBottomSheet
          isOpen={true}
          onClose={() => { }}
          isHeader={false}
          title="Register"
          subtitle="Register to get started"
        >
          <FormContent />
        </CustomBottomSheet>
      ) : (
        <CustomModal
          isOpen={true}
          onClose={() => { }}
          isHeader={false}
          title="Register"
          subtitle="Register to get started"
          maxWidth="max-w-sm"
        >
          <FormContent />
        </CustomModal>
      )}
    </div>
  )
}
