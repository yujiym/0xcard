'use client'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useAuth } from '@polybase/react'
import { db } from '@/components/PolybaseWrapper'
import { Toaster } from '@/components/ui/Toaster'
import { sessionAtom } from '@/lib/atoms'

export default function useSession() {
  const { state, loading } = useAuth()
  const [session, setSession] = useAtom(sessionAtom)
  const userRef = db.collection('User')

  useEffect(() => {
    if (loading) {
      setSession({
        ...session,
        loading,
      })
    } else {
      setSession({
        ...session,
        loading,
        userId: state?.userId,
      })
    }
  }, [loading, state])

  useEffect(() => {
    ;(async () => {
      if (session?.userId) {
        const res = await userRef.record(session.userId).get()
        if (res?.data?.cid) {
          setSession({
            ...session,
            cid: res.data.cid,
          })
        }
      }
    })()
  }, [session.userId])
}
