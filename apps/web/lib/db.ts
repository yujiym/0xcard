import { db } from '@/components/PolybaseWrapper'

// @public
// collection User {
//   id: string;
//   cid: string;
//   name?: string;
//   photo1?: string;
//   publicKey: PublicKey;
//
// constructor (id: string, cid: string, name: string, photo1: string) {
//   this.id = id;
//   this.cid = cid;
//   this.name = name;
//   if (photo1) {
//     this.photo1 = photo1;
//   }
//   this.publicKey = ctx.publicKey;
// }
//
// setUser (cid: string, name: string, photo1: string) {
//   if (ctx.publicKey != this.publicKey) {
//     error('You are not the creator of this record.');
//   }
//   this.cid = cid;
//   this.name = name;
//   if (photo1) {
//     this.photo1 = photo1;
//   }
// }
//
//   del () {
//     if (ctx.publicKey != this.publicKey) {
//       error('You are not the creator of this record.');
//     }
//     selfdestruct();
//   }
// }
const userRef = db.collection('User')

export const getUser = async (id: string): Promise<any> => {
  const res = await userRef.record(id).get()
  return res.data
}

export const createUser = async (
  id: string,
  cid: string,
  name: string,
  photo1: string
) => {
  await userRef.create([id, cid, name, photo1])
}

export const updateUser = async (
  id: string,
  cid: string,
  name: string,
  photo1: string
) => {
  await userRef.record(id).call('setUser', [cid, name, photo1])
}

// @public
// collection Contact {
//   id: string;
//   cid: string;
//   targetCid: string;
//   publicKey: PublicKey;
//
//   constructor (cid: string, targetCid: string) {
//     this.id = cid + '-' +  targetCid;
//     this.cid = cid;
//     this.targetCid = targetCid;
//     this.publicKey = ctx.publicKey;
//   }
//
//   del () {
//     if (ctx.publicKey != this.publicKey) {
//       error('You are not the creator of this record.');
//     }
//     selfdestruct();
//   }
// }
const contactRef = db.collection('Contact')

export const addUserContact = async (cid: string, targetCid: string) => {
  await contactRef.create([cid, targetCid])
}

export const removeUserContact = async (cid: string, targetCid: string) => {
  await contactRef.record(`${cid}-${targetCid}`).call('del')
}

// collection UserKey {
//   id: string; // cid
//   key: string;
//   userId: string;
//
//   @read
//   publicKey: PublicKey;
//
//   constructor (id: string, userId: string, key: string) {
//     this.id = id;
//     this.userId = userId;
//     this.key = key;
//     this.publicKey = ctx.publicKey;
//   }
// }
const userKeyRef = db.collection('UserKey')

export const saveUserKey = async (
  cid: string,
  userId: string,
  key: any
): Promise<any> => {
  const encodedKey = window.btoa(JSON.stringify(key))
  const res = await userKeyRef.create([cid, userId, encodedKey])
  return res.data
}

export const readUserKey = async (cid: string) => {
  const res = await userKeyRef.record(cid).get()
  const decordedKey = JSON.parse(window.atob(res.data.key))
  return decordedKey
}
