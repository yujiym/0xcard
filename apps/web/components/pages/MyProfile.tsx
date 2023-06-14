'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useIsAuthenticated } from '@polybase/react'
import { Edit3 } from 'lucide-react'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import ShareButton from '@/components/ShareButton'
import Loader from '@/components/Loader'
import Profile from '@/components/Profile'
import SigninScreen from '@/components/SigninScreen'
import { useAtomValue } from 'jotai'
import { sessionAtom } from '@/lib/atoms'
import useWeb3Storage from '@/hooks/useWeb3Storage'
import useSession from '@/hooks/useSession'

export default function MyProfiePage() {
  useSession()
  const [isLoggedIn, loading] = useIsAuthenticated()
  const { read, reading } = useWeb3Storage()
  const session = useAtomValue(sessionAtom)

  useEffect(() => {
    ;(async () => {
      if (session?.cid) {
        await read(session.cid)
      }
    })()
  }, [session?.cid])

  return (
    <>
      {(loading || reading) && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>
            <div className="flex justify-between w-full items-center">
              <span>My profile</span>
              <div className="w-12 h-12">
                <ShareButton cid={session.cid ?? ''} />
              </div>
            </div>
          </Header>
          <main className="container-sm">
            <Profile userData={session.data} klass="pb-32" />
          </main>
          <Link
            href="/profile/edit"
            className="fixed right-4 md:bottom-3 bottom-16 z-50 rounded-full h-16 w-16 flex justify-center items-center text-background bg-primary border-4 border-background"
          >
            <Edit3 />
          </Link>
          <Nav />
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
