import { useState } from 'react'
import { useAtom } from 'jotai'
import { sessionAtom } from '@/lib/atoms'
import { uploadData, readData } from '@/lib/web3Storage'
import { parseVcard } from '@/lib/vcard'
import { socialLists } from '@/../../packages/lib/const'

export default function useWeb3Storage() {
  const [session, setSession] = useAtom(sessionAtom)
  const [reading, setReading] = useState<boolean>(false)

  const upload = async (data: string) => {
    const cid = await uploadData(data)
    setSession({ ...session, cid })
    console.log('upload complete - cid: ', cid)
  }

  const read = async (cid: string) => {
    setReading(true)
    const res = await readData(cid)
    // @ts-ignore
    const data: any[] = parseVcard(res)?.parsedVcard
    const socialData = socialLists.map(item => {
      return {
        name: item.name,
        content:
          data.find(
            el =>
              el.property === 'URL' &&
              el.parameters.ALTID === item.name.toUpperCase()
          )?.value ?? '',
        visibility: 'public',
      }
    })

    setSession({
      ...session,
      cid,
      data: [
        {
          name: 'name',
          content: data.find(el => el.property === 'FN')?.value ?? '',
          visibility: 'public',
        },
        {
          name: 'about',
          content:
            data.find(
              el => el.property === 'NOTE' && el.parameters.ALTID === 'ABOUT'
            )?.value ?? '',
          visibility: 'public',
        },
        {
          name: 'photo1',
          content:
            data.find(
              el =>
                el.property === 'PHOTO' &&
                el.parameters.ALTID === 'PROFILE-PUBLIC-PHOTO'
            )?.value ?? '',
          visibility: 'public',
        },
        {
          name: 'photo2',
          content:
            data.find(
              el =>
                el.property === 'PHOTO' &&
                el.parameters.ALTID === 'PROFILE-PHOTO'
            )?.value ?? '',
          visibility: 'public',
        },
        socialData,
        {
          name: 'email',
          content: data.find(el => el.property === 'EMAIL')?.value ?? '',
          visibility: 'public',
        },
      ].flat(),
    })
    setReading(false)
  }

  return {
    upload,
    read,
    reading,
  }
}
