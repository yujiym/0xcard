import { Web3Storage } from 'web3.storage'

const client = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
})

export const uploadData = async (data: string): Promise<string> => {
  const file = new File([data], 'me.vcf')
  const cid = await client.put([file])
  return cid
}

export const readData = async (cid: string): Promise<string> => {
  const res = await client.get(cid)
  const files = await res.files()
  const data = await files[0].text()
  return data
}
