import { Metadata } from 'next'
import SettingsPage from '@/components/pages/Settings'
import { siteTitle } from '@0xcard/lib/const'

export const metadata: Metadata = {
  title: `Settings | ${siteTitle}`,
}

export default async function Page() {
  return <SettingsPage />
}
