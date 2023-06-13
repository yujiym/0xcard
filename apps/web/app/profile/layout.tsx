'use client'
import PolybaseWrapper from '@/components/PolybaseWrapper'
import { Toaster } from '@/components/ui/Toaster'
import { DevTools } from 'jotai-devtools'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PolybaseWrapper>
      <>
        <DevTools />
        {children}
        <Toaster />
      </>
    </PolybaseWrapper>
  )
}
