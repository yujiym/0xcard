'use client'
import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useIsAuthenticated, useAuth } from '@polybase/react'
import { useRouter } from 'next/navigation'
// @ts-ignore
import { ethConnect } from '@lit-protocol/auth-browser'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'
import { db } from '@/components/PolybaseWrapper'
import { sessionAtom } from '@/lib/atoms'
import { ChevronRight, LogOut, Package } from 'lucide-react'
import useSession from '@/hooks/useSession'
import { isFriends } from '@0xcard/lit-action/IPFS.js'
import { getCidLink } from '@/lib/web3Storage'

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
    ethConnect.disconnectWeb3()
    resetSession()
    router.push('/')
  }

  const test = async () => {
    const userId = '0xfecdee466589287071b62a05f364983c773c422e'
    const cid = 'k51qzi5uqu5djs1gnuskf1ybn3okcx4dgkj785pw86q3ofxqhpnzhi1vf2dt2k'
    const targetUserId =
      '0x95f23f05f69b54a3bcb672ea2e5f8bc8f7b07e1f2a8ea9ff31381dadd68e9ecb'
    const targetCid =
      'k51qzi5uqu5dgfzkz74vel5diqhl3d1wza9talhf56onp3788xjmyj1ua4f5dw'

    const res = await isFriends(userId, targetUserId, cid, targetCid)
    console.log('isFriends: ', res)
  }

  const setContact = async () => {
    const recordData = await userRef
      .record(state.userId)
      .call('setContacts', [
        [
          'k51qzi5uqu5djs1gnuskf1ybn3okcx4dgkj785pw86q3ofxqhpnzhi1vf2dt2k',
          'k51qzi5uqu5dgfzkz74vel5diqhl3d1wza9talhf56onp3788xjmyj1ua4f5dw',
        ],
      ])
    console.log('recordData:  ', recordData)
  }

  const [link, setLink] = useState('')

  useEffect(() => {
    ;(async () => {
      if (cid) {
        const res = await getCidLink(cid)
        setLink(res)
      }
    })()
  }, [cid])

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
                  <>
                    <a
                      className="pl-6 pr-5 py-5 w-full flex justify-between"
                      href={`https://name.web3.storage/name/${cid}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span className="flex items-center">
                        <Package className="mr-3" />
                        Show IPFS File (IPNS)
                      </span>
                      <span>
                        <ChevronRight />
                      </span>
                    </a>
                    <a
                      className="pl-6 pr-5 py-5 w-full flex justify-between"
                      href={`${link}/me.vcf`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span className="flex items-center">
                        <Package className="mr-3" />
                        Show IPFS data (web3.storage)
                      </span>
                      <span>
                        <ChevronRight />
                      </span>
                    </a>
                  </>
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
              {process.env.NODE_ENV === 'development' && (
                <>
                  <p className="mt-20 text-center font-mono">Dev Menu</p>
                  <List>
                    <button
                      className="pl-6 pr-5 py-5 w-full flex justify-between"
                      onClick={() => deleteUser()}
                    >
                      <span className="flex items-center">Delete user</span>
                      <span>
                        <ChevronRight />
                      </span>
                    </button>
                  </List>
                  <List>
                    <button
                      className="pl-6 pr-5 py-5 w-full flex justify-between"
                      onClick={() => setContact()}
                    >
                      <span className="flex items-center">Set Contacts</span>
                      <span>
                        <ChevronRight />
                      </span>
                    </button>
                  </List>
                  <List>
                    <button
                      className="pl-6 pr-5 py-5 w-full flex justify-between"
                      onClick={() => test()}
                    >
                      <span className="flex items-center">Test Lit Action</span>
                      <span>
                        <ChevronRight />
                      </span>
                    </button>
                  </List>
                </>
              )}
            </ul>
            <Nav />
          </main>
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
