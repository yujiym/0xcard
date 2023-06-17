'use client'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useAuth } from '@polybase/react'
import { useToast } from '@/hooks/useToast'
import { sessionAtom } from '@/lib/atoms'
import {
  createUser,
  updateUser,
  getUser,
  addUserContact,
  removeUserContact,
} from '@/lib/db'

export default function useSession() {
  const { state, loading } = useAuth()
  const [session, setSession] = useAtom(sessionAtom)
  const { toast } = useToast()

  useEffect(() => {
    if (loading) {
      setSession({
        ...session,
      })
    } else {
      setSession({
        ...session,
        userId: state?.userId,
      })
    }
  }, [loading, state])

  useEffect(() => {
    ;(async () => {
      if (session?.userId) {
        const res = await getUser(session.userId)
        if (res?.cid) {
          setSession({
            ...session,
            loaded: true,
            cid: res.cid,
          })
        }
      }
    })()
  }, [session.userId])

  const setUser = async (
    mode: 'new' | 'update',
    cid: string,
    name: string,
    photo1: string
  ) => {
    try {
      setSession({
        ...session,
        cid,
      })
      console.log('update User table - mode: ', mode, ' : ', name, cid, photo1)
      if (mode === 'new') {
        return await createUser(state?.userId, cid, name, photo1)
      } else {
        return await updateUser(session.userId, cid, name, photo1)
      }
    } catch (e) {
      console.log('error - setUser: ', 'mode: ', mode, e)
      throw e
    }
  }

  const addContact = async (cid: string, targetCid: string) => {
    try {
      setSession({
        ...session,
        contacts: [...session.contacts, cid],
      })
      await addUserContact(cid, targetCid)
      toast({ description: 'Added to contacts.' })
    } catch (e) {
      console.log('error - addContacts: ', e)
      throw e
    }
  }

  const removeContact = async (cid: string, targetCid: string) => {
    try {
      setSession({
        ...session,
        contacts: session.contacts.filter((c: string) => c !== cid),
      })
      await removeUserContact(cid, targetCid)
      toast({ description: 'Remove from contacts.' })
    } catch (e) {
      console.log('error - removeContacts: ', e)
      throw e
    }
  }

  return {
    setUser,
    addContact,
    removeContact,
  }
}
