import { isFriends } from './IPFS.js'

// set data
const cid = ''
const targetCid = ''

// exec test
const res = await isFriends(cid, targetCid)
console.log('isFriends: ', res)
