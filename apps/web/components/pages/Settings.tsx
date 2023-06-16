'use client'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useIsAuthenticated, useAuth } from '@polybase/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'
import { usePolybase, useCollection } from '@polybase/react'
import { db } from '@/components/PolybaseWrapper'
import { sessionAtom } from '@/lib/atoms'
import { ChevronRight, LogOut, Package } from 'lucide-react'

export default function SettingsPage() {
  const [isLoggedIn, loading] = useIsAuthenticated()
  const { auth, state } = useAuth()
  const router = useRouter()
  const { cid } = useAtomValue(sessionAtom)
  const resetSession = useResetAtom(sessionAtom)

  const polybase = usePolybase()
  // const {
  //   data,
  //   error,
  //   loading: loadingP,
  // } = useCollection(polybase.collection('User'))

  const userRef = db.collection('User')

  console.log('state: ', state)

  useEffect(() => {
    ;(async () => {
      const data = await userRef.get()
      console.log('data: ', data)
    })()
  }, [])

  // const writeUser = async () => {
  //   const recordData = await userRef.create([
  //     state.userId,
  //     'bafybeighuv7gi76m4veniiaa7qdtnspuuyhp243veoi4pc2wg7lrqgth4y',
  //   ])
  //   console.log('recordData:  ', recordData)
  // }

  // const updateUser = async () => {
  //   const recordData = await userRef
  //     .record(state.userId)
  //     .call('updateUser', [
  //       state.userId,
  //       'bafybeighuv7gi76m4veniiaa7qdtnspuuyhp243veoi4pc2wg7lrqgth4y',
  //     ])
  //   console.log('recordData:  ', recordData)
  // }

  // const deleteUser = async () => {
  //   const recordData = await userRef.record(state.userId).call('del')
  //   console.log('recordData:  ', recordData)
  // }

  const signOut = async () => {
    await auth?.signOut()
    resetSession()
    router.push('/')
  }

  const List = ({ children }) => (
    <li className="border-b border-dotted">{children}</li>
  )

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>Settings</Header>
          <main className="container-sm">
            <ul className="border-t border-dotted mt-20 sm:mx-12">
              <List>
                <button
                  className="pl-6 pr-5 py-5 w-full flex justify-between"
                  onClick={() => signOut()}
                >
                  <span className="flex items-center">
                    <LogOut className="mr-3" />
                    Signout
                  </span>
                  <span>
                    <ChevronRight />
                  </span>
                </button>
              </List>
              {cid && (
                <List>
                  <a
                    className="pl-6 pr-5 py-5 w-full flex justify-between"
                    href={`https://name.web3.storage/name/${cid}`}
                    target="_black"
                    rel="noreferrer noopener"
                  >
                    <span className="flex items-center">
                      <Package className="mr-3" />
                      Show IPFS data
                    </span>
                    <span>
                      <ChevronRight />
                    </span>
                  </a>
                </List>
              )}
            </ul>
            {/* <button className="btn-outline" onClick={() => signOut()}>
              SignOut
            </button>
            <button className="btn-outline" onClick={() => writeUser()}>
              Write test
            </button>
            <button className="btn-outline" onClick={() => updateUser()}>
              Update test
            </button>
            <button className="btn-outline" onClick={() => deleteUser()}>
              Del test
            </button> */}
            <Nav />
          </main>
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
