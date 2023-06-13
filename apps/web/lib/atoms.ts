import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

// user
export const userAtom = atom<any>({
  cid: undefined,
  cid2: undefined,
  data: [],
})
