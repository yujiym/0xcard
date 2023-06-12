import { Web3Storage } from 'web3.storage'

const client = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || '',
})

export const upload = async (data: string) => {
  const file = new File([data], 'me.vcf')
  console.log('file: ', file)
  const cid = await client.put([file])
  console.log('cid: ', cid)
  return cid
}
