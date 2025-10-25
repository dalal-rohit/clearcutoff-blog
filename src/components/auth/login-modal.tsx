import { Button, FormControl, FormLabel, Typography } from '@mui/joy'
import React from 'react'
import { CustomBottomSheet, CustomModal } from '../modals-bottom-sheet'
import useIsMobile from '@/hooks/isMobile'

function FormContent() {
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
          // onClick={() => openModal({ type: "register" })}
          className="!font-semibold text-[#0083ff] cursor-pointer"
        >
          Sign Up{" "}
        </span>
      </Typography>
    </div>
    <div className="flex flex-col gap-4">
      <FormControl>
        <FormLabel className="body-small !font-semibold neutral-blueGrayLight">
          Mobile Number
        </FormLabel>

        {/* {renderNumberInput()} */}
      </FormControl>

      <Button
        // disabled={disabled}
        size="lg"
        fullWidth
        type="submit"
      // loading={isLoading}
      // sx={{
      //   ...disabledButtonStyle(),
      // }}
      >
        Continue Now!
      </Button>
    </div>
  </form>

}

export default function LoginModal() {



  const isMobile = useIsMobile()

  return (
    <div>{isMobile ? (
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
    )}</div>
  )
}
