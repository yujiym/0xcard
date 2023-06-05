'use client'
import { auth } from '@/components/PolybaseWrapper'
import Loader from '@/components/Loader'
import { useIsAuthenticated } from '@polybase/react'

export default function Page() {
  const [isLoggedIn, loading] = useIsAuthenticated()

  const signIn = () => {
    const authState = auth?.signIn()
    console.log('authState:::', authState)
  }

  return (
    <>
      {loading && <Loader />}
      <button
        onClick={() => signIn()}
        className="mt-20 mx-20 border-2 border-ink px-8 py-2"
      >
        login
      </button>
      <p>{String(isLoggedIn)}</p>
    </>
  )
}
