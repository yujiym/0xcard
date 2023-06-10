'use client'
import { auth } from '@/components/PolybaseWrapper'

export default function Signin() {
  const signIn = () => {
    const authState = auth?.signIn()
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <img src="/icons/icon-256x256.png" height="128" width="128" />
        <button onClick={() => signIn()} className="mt-10 btn-outline">
          Signin
        </button>
      </div>
    </div>
  )
}
