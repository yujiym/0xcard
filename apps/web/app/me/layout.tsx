import { useEffect } from 'react'
// import { useRouter } from 'next/router'
import PolybaseWrapper from '@/components/PolybaseWrapper'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const router = useRouter()

  return <PolybaseWrapper>{children}</PolybaseWrapper>
}
