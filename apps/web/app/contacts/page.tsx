import { Metadata } from 'next'
import ContactsPage from '@/components/pages/Contacts'
import { siteTitle } from '@0xcard/lib/const'

export const metadata: Metadata = {
  title: `Contacts | ${siteTitle}`,
}

export default async function Page() {
  return <ContactsPage />
}
