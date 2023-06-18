import * as LitJsSdk from '@lit-protocol/lit-node-client'

const chain = 'ethereum'

// Conditions of users with entered did and mutual followings.
const createAccessConditions = (
  userId: string,
  targetUserId: string,
  cid: string,
  targetCid: string
) => {
  return [
    {
      contractAddress:
        'https://bafybeiengmxblvgc7byhiksb3ykdnji3px22j4fjglya3lhw6zzua2z4vu.ipfs.w3s.link/IPFS.js',
      standardContractType: 'LitAction',
      chain,
      method: 'isFriends',
      parameters: [userId, targetUserId, cid, targetCid],
      returnValueTest: {
        comparator: '=',
        value: 'true',
      },
    },
  ]
}

// return encryptedSymmetricKey, EncryptedString
export const encryptAndSave = async (
  userId: string,
  targetUserId: string,
  cid: string,
  targetCid: string,
  input: string
): Promise<[string, string]> => {
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(input)
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  const client = new LitJsSdk.LitNodeClient({ litNetwork: 'serrano' })
  await client.connect()
  const encryptedSymmetricKey = await client.saveEncryptionKey({
    accessControlConditions: createAccessConditions(
      userId,
      targetUserId,
      cid,
      targetCid
    ),
    symmetricKey,
    authSig,
    chain,
  })
  return [
    LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16'),
    await LitJsSdk.blobToBase64String(encryptedString),
  ]
}

// return DecryptedString
export const decryptAndRead = async (
  cid: string,
  targetCid: string,
  encryptedSymmetricKey: string,
  encryptedStr: string
): Promise<string> => {
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  const client = new LitJsSdk.LitNodeClient({ litNetwork: 'serrano' })
  await client.connect()
  const symmetricKey = await client.getEncryptionKey({
    accessControlConditions: createAccessConditions(
      userId,
      targetUserId,
      cid,
      targetCid
    ),
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  })

  return await LitJsSdk.decryptString(
    LitJsSdk.base64StringToBlob(encryptedStr),
    symmetricKey
  )
}
