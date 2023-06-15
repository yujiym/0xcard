'use client'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useAuth } from '@polybase/react'
import { useToast } from '@/hooks/useToast'
import { db } from '@/components/PolybaseWrapper'
import { sessionAtom } from '@/lib/atoms'

export default function useSession() {
  const { state, loading } = useAuth()
  const [session, setSession] = useAtom(sessionAtom)
  const userRef = db.collection('User')
  const { toast } = useToast()

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

  const addContacts = async (cid: string) => {
    try {
      setSession({
        ...session,
        contacts: [...session.contacts, cid],
      })
      await userRef.record(session.userId).call('addCoontacts', [cid])
      toast({ description: 'Added to contacts.' })
    } catch (e) {
      console.log('error - addContacts: ', e)
      throw e
    }
  }

  const removeContacts = async (cid: string) => {
    try {
      setSession({
        ...session,
        contacts: session.contacts.filter((c: string) => c !== cid),
      })
      await userRef.record(session.userId).call('removeCoontacts', [cid])
      toast({ description: 'Remove from contacts.' })
    } catch (e) {
      console.log('error - removeContacts: ', e)
      throw e
    }
  }

  return {
    addContacts,
    removeContacts,
  }
}
