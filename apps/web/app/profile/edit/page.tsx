import { Metadata } from 'next'
import EditProfilePage from '@/components/pages/EditProfile'
import { siteTitle } from '@0xcard/lib/const'

export const metadata: Metadata = {
  title: `Edit profile | ${siteTitle}`,
}

export default async function Page() {
  return <EditProfilePage />
}
