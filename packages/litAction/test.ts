import { isFriends } from './IPFS.js'

// set data
const cid = 'k51qzi5uqu5djs1gnuskf1ybn3okcx4dgkj785pw86q3ofxqhpnzhi1vf2dt2k'
const targetCid =
  'k51qzi5uqu5dgfzkz74vel5diqhl3d1wza9talhf56onp3788xjmyj1ua4f5dw'
const userId = '0xfecdee466589287071b62a05f364983c773c422e'
const targetUserId =
  '0x95f23f05f69b54a3bcb672ea2e5f8bc8f7b07e1f2a8ea9ff31381dadd68e9ecb'

// exec test
const res = await isFriends(userId, targetUserId, cid, targetCid)
console.log('isFriends: ', res)
