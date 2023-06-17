import { Metadata } from 'next'
import UserPage from '@/components/pages/User'
import { readData } from '@/lib/web3Storage'
import { parseVcard } from '@/lib/vcard'
import { siteTitle, siteDescription } from '@0xcard/lib/const'

type Props = {
  params: { cid: string }
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const cid = params.cid
//   const res = await readData(cid)
//   // @ts-ignore
//   const data: any[] = parseVcard(res)?.parsedVcard
//   const name = data.find(el => el.property === 'FN')?.value ?? ''

//   return {
//     title: name ? `${name} | ${siteTitle}` : siteTitle,
//   }
// }

//   return {
//     title: name ? `${name} | ${siteTitle}` : siteTitle,
//   }

export const metadata: Metadata = {
  title: siteDescription,
}

export default async function Page() {
  return <UserPage />
}
