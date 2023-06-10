import PolybaseWrapper from '@/components/PolybaseWrapper'
import { Toaster } from '@/components/ui/Toaster'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PolybaseWrapper>
      <>
        {children}
        <Toaster />
      </>
    </PolybaseWrapper>
  )
}
