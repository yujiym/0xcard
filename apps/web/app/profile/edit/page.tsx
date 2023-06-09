'use client'
import { useIsAuthenticated } from '@polybase/react'
import { Save } from 'lucide-react'
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
          <Header>Edit profile</Header>
          <main className="container-sm"></main>
          <button
            type="submit"
            className="fixed right-4 md:bottom-3 bottom-16 z-50 rounded-full h-16 w-16 flex justify-center items-center text-background bg-primary border-4 border-background"
          >
            <Save />
          </button>
          <Nav />
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
