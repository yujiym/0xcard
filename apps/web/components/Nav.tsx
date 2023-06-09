import Link from 'next/link'
import { Contact2, Users2, Settings2 } from 'lucide-react'

export default function Nav({
  hasActionButton = false,
}: {
  hasActionButton?: boolean
}) {
  return (
    <nav className="z-40 fixed bottom-0 right-0 left-0 m-4">
      <div
        className={`max-w-screen-sm mx-auto rounded-2xl h-14 px-5 bg-primary text-background flex justify-around items-center relative
          ${hasActionButton ? 'pr-10 md:pr-0' : ''}`}
      >
        <Link
          href="/profile"
          className="w-full h-full flex justify-center items-center"
        >
          <Contact2 size={32} strokeWidth={1.5} />
        </Link>
        <Link
          href="/contacts"
          className="w-full h-full flex justify-center items-center"
        >
          <Users2 size={32} strokeWidth={1.5} />
        </Link>
        <Link
          href="/settings"
          className="w-full h-full flex justify-center items-center"
        >
          <Settings2 size={30} strokeWidth={1.5} />
        </Link>
      </div>
    </nav>
  )
}
