'use client'
import "@/app/globals.css";

import ErrorPage from '@/components/error-page'

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-screen w-full">
          <ErrorPage />
        </div>
      </body>
    </html>

  )
}