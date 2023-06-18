import * as LitJsSdk from '@lit-protocol/lit-node-client'

const chain = 'ethereum'

// Conditions of users with entered did and mutual followings.
const createAccessConditions = (cid: string, targetCid: string) => {
  return [
    {
      contractAddress: 'ipfs://aaaaa',
      standardContractType: 'LitAction',
      chain,
      method: 'isFriends',
      parameters: [cid, targetCid],
      returnValueTest: {
        comparator: '=',
        value: 'true',
      },
    },
  ]
}

// return encryptedSymmetricKey, EncryptedString
export const encryptAndSave = async (
  cid: string,
  targetCid: string,
  input: string
): Promise<[string, string]> => {
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(input)
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
  const client = new LitJsSdk.LitNodeClient({ litNetwork: 'serrano' })
  await client.connect()
  const encryptedSymmetricKey = await client.saveEncryptionKey({
    accessControlConditions: createAccessConditions(cid, targetCid),
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
    accessControlConditions: createAccessConditions(cid, targetCid),
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  })

  return await LitJsSdk.decryptString(
    LitJsSdk.base64StringToBlob(encryptedStr),
    symmetricKey
  )
}
