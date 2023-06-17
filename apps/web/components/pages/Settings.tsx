'use client'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useIsAuthenticated, useAuth } from '@polybase/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'
import { db } from '@/components/PolybaseWrapper'
import { sessionAtom } from '@/lib/atoms'
import { ChevronRight, LogOut, Package } from 'lucide-react'
import useSession from '@/hooks/useSession'

export default function SettingsPage() {
  const [isLoggedIn, loading] = useIsAuthenticated()
  const { auth, state } = useAuth()
  const router = useRouter()
  const { cid } = useAtomValue(sessionAtom)
  const resetSession = useResetAtom(sessionAtom)

  useSession()
  const userRef = db.collection('User')

  const deleteUser = async () => {
    const recordData = await userRef.record(state.userId).call('del')
    console.log('recordData:  ', recordData)
  }

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
                {cid ? (
                  <a
                    className="pl-6 pr-5 py-5 w-full flex justify-between"
                    href={`https://name.web3.storage/name/${cid}`}
                    target="_blank"
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
                ) : (
                  <p className="pl-6 pr-5 py-5 w-full flex justify-between text-primary/60 cursor-not-allowed">
                    <span className="flex items-center">
                      <Package className="mr-3" />
                      Show IPFS data
                    </span>
                    <span>
                      <ChevronRight />
                    </span>
                  </p>
                )}
              </List>
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

              <List>
                <button
                  className="pl-6 pr-5 py-5 w-full flex justify-between"
                  onClick={() => deleteUser()}
                >
                  <span className="flex items-center">
                    <LogOut className="mr-3" />
                    del
                  </span>
                  <span>
                    <ChevronRight />
                  </span>
                </button>
              </List>
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
