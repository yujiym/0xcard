export const isFriends = async (cid, targetCid) => {
  const cid1 = cid + '-' + targetCid
  const cid2 = targetCid + '-' + cid
  try {
    const url1 =
      'https://testnet.polybase.xyz/v0/collections/Collection/records/pk%2F0x78270b82619ae45a456613d40b07d297bb50b15fa7bad88a2eab0335fa98a82fa7f206c3c6f0ebfc5a250b2d9803935dec4eebf69eedfb1cbd28bfe7bd006711%2F0xCARD%2FContact%2Frecords%2F' +
      cid1
    const url2 =
      'https://testnet.polybase.xyz/v0/collections/Collection/records/pk%2F0x78270b82619ae45a456613d40b07d297bb50b15fa7bad88a2eab0335fa98a82fa7f206c3c6f0ebfc5a250b2d9803935dec4eebf69eedfb1cbd28bfe7bd006711%2F0xCARD%2FContact%2Frecords%2F' +
      cid2
    const [resp1, resp2] = await Promise.all([
      await fetch(url1).then(response => response.json()),
      await fetch(url2).then(response => response.json()),
    ])
    const result = !!resp1?.data && !!resp2?.data
    return result
  } catch (e) {
    console.log('error in litAction: ', e)
  }
  return false
}
