'use client'
import { PolybaseProvider, AuthProvider } from '@polybase/react'
import { Polybase } from '@polybase/client'
import { Auth } from '@polybase/auth'

export const db = new Polybase({
  defaultNamespace:
    'pk/0x78270b82619ae45a456613d40b07d297bb50b15fa7bad88a2eab0335fa98a82fa7f206c3c6f0ebfc5a250b2d9803935dec4eebf69eedfb1cbd28bfe7bd006711/0xcard',
})

export const auth = typeof window !== 'undefined' ? new Auth() : null

export default function PolybaseWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PolybaseProvider polybase={db}>
      <AuthProvider polybase={db} auth={auth}>
        {children}
      </AuthProvider>
    </PolybaseProvider>
  )
}
