'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useIsAuthenticated } from '@polybase/react'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'
import { ChevronRight } from 'lucide-react'
import { db } from '@/components/PolybaseWrapper'

export default function ContactsPage() {
  const [isLoggedIn, loading] = useIsAuthenticated()
  const [contacts, setContacts] = useState<any[]>([])
  const userRef = db.collection('User')

  useEffect(() => {
    ;(async () => {
      const { data } = await userRef.get()
      setContacts(data)
    })()
  }, [])

  const ContactLists = ({ contacts }: { contacts: any[] }) => (
    <ul className="border-t border-dotted mt-20 sm:mx-12">
      {contacts.map((contact: any) => (
        <li className="border-b border-dotted">
          <Link
            className="pl-6 pr-5 h-24 w-full flex items-center justify-between"
            href={`/${contact.data.cid}`}
          >
            <div className="flex items-center">
              {contact.data.photo1 ? (
                <img
                  src={contact.data.photo1}
                  alt={contact.data.name}
                  className="rounded-full border-4 border-background"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="rounded-full border-4 border-background bg-stripe w-[64px] h-[64px]" />
              )}
              <div className="mx-6">{contact.data.name}</div>
            </div>
            <span>
              <ChevronRight />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>Contacts</Header>
          <main className="container-sm">
            <ContactLists contacts={contacts} />
          </main>
          <Nav />
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
