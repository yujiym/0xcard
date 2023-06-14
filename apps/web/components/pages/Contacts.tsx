'use client'
import { useIsAuthenticated } from '@polybase/react'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'

export default function ContactsPage() {
  const [isLoggedIn, loading] = useIsAuthenticated()

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>Contacts</Header>
          <main className="container-sm"></main>
          <Nav />
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
