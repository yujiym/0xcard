'use client'
import { PolybaseProvider, AuthProvider } from '@polybase/react'
import { Polybase } from '@polybase/client'
import { Auth } from '@polybase/auth'

export const db = new Polybase({
  defaultNamespace: '0xcard',
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
