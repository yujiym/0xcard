'use client'
import { PolybaseProvider, AuthProvider } from '@polybase/react'
import { Polybase } from '@polybase/client'
import { Auth } from '@polybase/auth'

export const db = new Polybase({
  defaultNamespace:
    'pk/0xa773c37764b8b947880f0406cebefb69443d53f513f4f3b6a1dbad5cbecde9196ac8db42bd97610e0e157f6af069fadc6f4cd48ee21fd2a5959b352ae6afbb60/0xCARD',
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
