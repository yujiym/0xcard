import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

// session
export const sessionAtom = atomWithReset<any>({
  loaded: true,
  userId: undefined,
  cid: undefined,
  data: [],
  contacts: [],
})

// user
export const usersAtom = atom<any[]>([])
