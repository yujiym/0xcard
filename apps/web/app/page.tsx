import { Metadata } from 'next'
import TopPage from 'components/pages/Top'
import { siteDescription } from '@0xcard/lib/const'

export const metadata: Metadata = {
  title: siteDescription,
}

export default function Page() {
  return <TopPage />
}
