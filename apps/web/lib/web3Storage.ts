import { Web3Storage } from 'web3.storage'
import * as Name from 'w3name'
import { saveUserKey, readUserKey } from '@/lib/db'

const client = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
})

export const uploadData = async (
  data: string,
  userId: string,
  w3name?: string
): Promise<string> => {
  try {
    const file = new File([data], 'me.vcf')
    const cid = await client.put([file])
    if (w3name) {
      // update
      const name = await Name.parse(w3name)
      const revision = await Name.resolve(name)
      const nextRevision = await Name.increment(revision, `/ipfs/${cid}`)
      const pubKey = await readUserKey(name.toString())
      await Name.publish(nextRevision, pubKey)
      console.log('w3name update - key: ', name.toString())
      return name.toString()
    } else {
      // new
      const name = await Name.create()
      const revision = await Name.v0(name, `/ipfs/${cid}`)
      Promise.all([
        await saveUserKey(name.toString(), userId, name.key),
        await Name.publish(revision, name.key),
      ])
      console.log('w3name new - key: ', name.toString())
      return name.toString()
    }
  } catch (e) {
    console.log('error - uploadData: ', e)
    throw e
  }
}

export const getCidLink = async (w3name: string): Promise<string> => {
  const name = Name.parse(w3name)
  const revision = await Name.resolve(name)
  return `https://${revision.value.replace(/^\/ipfs\//, '')}.ipfs.w3s.link/`
}

export const readData = async (w3name: string): Promise<string> => {
  try {
    const name = Name.parse(w3name)
    const revision = await Name.resolve(name)
    const res = await client.get(revision.value.replace(/^\/ipfs\//, ''))
    const files = await res.files()
    const data = await files[0].text()
    return data
  } catch (e) {
    console.log('error - readData: ', e)
    throw e
  }
}
