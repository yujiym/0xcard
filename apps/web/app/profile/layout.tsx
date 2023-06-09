import PolybaseWrapper from '@/components/PolybaseWrapper'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PolybaseWrapper>{children}</PolybaseWrapper>
}
