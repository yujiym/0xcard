export const go = async (userId, cid, targetUserId, targetCid) => {
  const urlBase =
    'https://testnet.polybase.xyz/v0/collections/pk%2F0x78270b82619ae45a456613d40b07d297bb50b15fa7bad88a2eab0335fa98a82fa7f206c3c6f0ebfc5a250b2d9803935dec4eebf69eedfb1cbd28bfe7bd006711%2F0xcard%2FUser/records/'

  try {
    const url1 = urlBase + userId
    const resp1 = await fetch(url1).then(response => response.json())
    // me
    if (resp1?.data.id === userId) return true
    // no friends
    if (!targetUserId || !targetCid) return false
    // isFriends
    const url2 = urlBase + targetUserId
    const resp2 = await fetch(url2).then(response => response.json())
    const result =
      resp1?.data?.contacts.includes(targetCid) &&
      resp2?.data?.contacts.includes(cid)
    return result
  } catch (e) {
    console.log('error in litAction: ', e)
  }
  return false
}
