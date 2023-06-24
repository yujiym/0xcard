import * as LitJsSdk from '@lit-protocol/lit-node-client'

const chain = 'ethereum'

// Conditions of users with entered did and mutual followings.
const createAccessConditions = (
  userId: string,
  cid: string,
  targetUserId?: string,
  targetCid?: string
) => {
  return [
    {
      contractAddress: process.env.NEXT_PUBLIC_LITACTION_IPFS,
      standardContractType: 'LitAction',
      chain,
      method: 'go',
      parameters: [userId, cid, targetUserId ?? '', , targetCid ?? ''],
      returnValueTest: {
        comparator: '=',
        value: 'true',
      },
    },
  ]
}

// return encryptedSymmetricKey, EncryptedString
export const encryptAndSave = async (
  input: string,
  userId: string,
  cid: string,
  targetUserId?: string,
  targetCid?: string
): Promise<[string, string]> => {
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(input)
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  const client = new LitJsSdk.LitNodeClient({
    litNetwork: 'serrano',
    alertWhenUnauthorized: true,
    debug: true,
  })
  await client.connect()
  const encryptedSymmetricKey = await client.saveEncryptionKey({
    accessControlConditions: createAccessConditions(
      userId,
      cid,
      targetUserId,
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
  encryptedSymmetricKey: string,
  encryptedStr: string,
  userId: string,
  cid: string,
  targetUserId?: string,
  targetCid?: string
): Promise<string> => {
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  const client = new LitJsSdk.LitNodeClient({
    litNetwork: 'serrano',
    alertWhenUnauthorized: true,
    debug: true,
  })
  await client.connect()
  const symmetricKey = await client.getEncryptionKey({
    accessControlConditions: createAccessConditions(
      userId,
      cid,
      targetUserId,
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
