'use client'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { DevTools } from 'jotai-devtools'
import { useAuth, useIsAuthenticated } from '@polybase/react'
import PolybaseWrapper, { db } from '@/components/PolybaseWrapper'
import { Toaster } from '@/components/ui/Toaster'
import { sessionAtom } from '@/lib/atoms'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading] = useIsAuthenticated()
  const { state } = useAuth()
  const [session, setSession] = useAtom(sessionAtom)
  const userRef = db.collection('User')

  useEffect(() => {
    console.log('01', loading, state)
    if (loading) {
      setSession({
        ...session,
        loading,
      })
    } else {
      console.log('02', loading, state)
      setSession({
        ...session,
        loading,
        userId: state?.userId,
      })
    }
    console.log('03', loading, state)
  }, [loading, state])

  useEffect(() => {
    ;(async () => {
      if (session?.userId) {
        const res = await userRef.record(session.userId).get()
        console.log('*****rerere', res)
        // if (res) {
        //   setSession({
        //     ...session,
        //     cid: res?.cid,
        //   })
        // }
      }
    })()
  }, [session.userId])

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
