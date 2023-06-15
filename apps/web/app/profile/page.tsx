import { Metadata } from 'next'
import MyProfilePage from '@/components/pages/MyProfile'
import { siteTitle } from '@0xcard/lib/const'

export const metadata: Metadata = {
  title: `My Profile | ${siteTitle}`,
}

export default async function Page() {
  return <MyProfilePage />
}
