'use client'
import { useIsAuthenticated, useAuth } from '@polybase/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'

export default function Page() {
  const [isLoggedIn, loading] = useIsAuthenticated()
  const { auth } = useAuth()
  const router = useRouter()

  const signOut = async () => {
    await auth?.signOut()
    router.push('/')
  }

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>Settings</Header>
          <main className="container-sm">
            <button className="btn-outline" onClick={() => signOut()}>
              SignOut
            </button>
            <Nav />
          </main>
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
