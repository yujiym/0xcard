'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { UserPlus2 } from 'lucide-react'
import Loader from '@/components/Loader'
import ShareButton from '@/components/ShareButton'
import Profile from '@/components/Profile'
import { useAtomValue } from 'jotai'
import { sessionAtom } from '@/lib/atoms'
import useWeb3Storage from '@/hooks/useWeb3Storage'

export default function UserPage() {
  const { read, reading } = useWeb3Storage()
  const session = useAtomValue(sessionAtom)
  const params = useParams()
  const cid = params?.cid ?? ''

  useEffect(() => {
    ;(async () => {
      cid && (await read(cid))
    })()
  }, [cid])

  return (
    <>
      {reading && <Loader />}
      <div className="fixed top-4 right-4 bg-primary/10 hover:bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center">
        <ShareButton cid={cid} />
      </div>
      <main className="container-sm pt-12">
        <Profile userData={session.data} klass="pb-16" />
      </main>
      <footer className="fixed bottom-0 right-0 left-0 px-8 text-left sm:text-center py-2 bg-background/70 backdrop-blur-sm">
        <span className="font-mono text-xs">BIULD with</span>{' '}
        <Link href="/">
          <span className="font-title text-sm">0xCARD</span>
        </Link>
      </footer>
      <button
        onClick={() => console.log('add friend')}
        className="fixed right-4 bottom-3 z-50 rounded-full h-16 w-16 flex justify-center items-center text-background bg-primary border-4 border-background "
      >
        <UserPlus2 />
      </button>
    </>
  )
}
