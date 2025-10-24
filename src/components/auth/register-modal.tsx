"use client"
import React from 'react'
import { CustomBottomSheet, CustomModal } from '../modals-bottom-sheet'
import useIsMobile from '@/hooks/isMobile'
import Link from 'next/link'
import { error } from 'console'
import { MobileNumberInput } from '../inputs/MobileNumberInput'
import FreeBadge from '../badge/free-badge'
import { Button } from '@mui/joy'

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
  return (
    <div className="p-5 space-y-3">
      <FreeBadge />
      <TitleBlock />
      <MobileNumberInput
        isLogin
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onSubmit={() => { }}
        // error={error}
        // inputRef={inputRef}
      />
      {/* <PhoneField phone={phone} setPhone={setPhone} /> */}
      <ContinueButton enabled={isValid} />
      <TermsText />
    </div>
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
          isHeader={true}
          title="Register"
          subtitle="Register to get started"
        >
          <FormContent />
        </CustomBottomSheet>
      ) : (
        <CustomModal
          isOpen={true}
          onClose={() => { }}
          isHeader={true}
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
