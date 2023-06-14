import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

// user
export const sessionAtom = atomWithReset<any>({
  loading: false,
  userId: undefined,
  cid: undefined,
  data: [],
})
