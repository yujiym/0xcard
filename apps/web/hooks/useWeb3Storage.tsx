import { useState } from 'react'
import { useAtom } from 'jotai'
import { sessionAtom, usersAtom } from '@/lib/atoms'
import { uploadData, readData } from '@/lib/web3Storage'
import { parseVcard } from '@/lib/vcard'
import { socialLists } from '@0xcard/lib/const'

export default function useWeb3Storage() {
  const [session, setSession] = useAtom(sessionAtom)
  const [users, setUsers] = useAtom(usersAtom)
  const [reading, setReading] = useState<boolean>(false)

  const upload = async (data: string, w3name: string): Promise<string> => {
    if (w3name) {
      const res = await uploadData(data, session.userId, w3name)
      return res
    } else {
      const res = await uploadData(data, session.userId)
      return res
    }
  }

  const read = async (cid: string, me: boolean = true): Promise<void> => {
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
    const userData = {
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
    }

    if (me) {
      setSession(userData)
    } else {
      setUsers([...users, userData])
    }
    setReading(false)
  }

  return {
    upload,
    read,
    reading,
  }
}
