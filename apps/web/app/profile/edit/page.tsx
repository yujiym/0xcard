'use client'
import Link from 'next/link'
import { useIsAuthenticated } from '@polybase/react'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'
import ProfileForm from '@/components/form/ProfileForm'

export default function Page() {
  const [isLoggedIn, loading] = useIsAuthenticated()

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>
            <>
              <Link href="/profile">
                <ArrowLeft className="mr-2" />
              </Link>
              Edit profile
            </>
          </Header>
          <main className="container-sm pb-32 md:pb-24">
            <ProfileForm />
          </main>
          <Nav />
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
