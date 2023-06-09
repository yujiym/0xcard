'use client'
import Link from 'next/link'
import { useIsAuthenticated } from '@polybase/react'
import { Edit3, Share } from 'lucide-react'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'

export default function Page() {
  const [isLoggedIn, loading] = useIsAuthenticated()

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>
            <div className="flex justify-between w-full items-center">
              <span>My profile</span>
              <span>
                <Share size={20} />
              </span>
            </div>
          </Header>
          <main className="container-sm"></main>
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
