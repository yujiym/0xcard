import Link from 'next/link'
import Image from 'next/image'
import { Globe, Unlock, FileQuestion } from 'lucide-react'
import ImgBC from 'assets/img/bc.png'
import { siteDescription } from '@0xcard/lib/const'

export const metadata = {
  title: siteDescription,
}

export default function TopPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row flex-1 bg-rounghpaper">
      <div className="flex flex-1 items-center justify-center">
        <div className="py-12">
          <h1 className="text-6xl mb-3 font-title">{siteDescription}</h1>
          <h2 className="text-2xl mb-12 mx-2">
            <span className="highlight">カード</span>プロトコル
          </h2>
          <h2 className="text-xl font-mono italic">
            <p>Decentrilized</p>
            <p>business card protocol</p>
            <p>with privacy</p>
          </h2>
          <ul className="pt-12 text-sm">
            <li>
              <a className="flex items-center">
                <FileQuestion size={18} className="mr-1.5" />
                How it works?
              </a>
            </li>
          </ul>
          <Link
            className="text-lg border-2 border-ink pr-5 pl-6 py-2 mt-10 inline-block font-mono"
            href="/dashboard"
          >
            Start
          </Link>
        </div>
      </div>
      <div className="flex md:flex-1 flex-auto items-center justify-center bg-ink text-paper p-8 overflow-hidden">
        <div>
          <ul className="flex justify-center items-center mb-6 rounded-full bg-gray-200/20 p-1 text-sm w-64">
            <li className="flex-1">
              <button className="px-3 py-1 whitespace-nowrap flex flex-nowrap items-center justify-center bg-ink rounded-full">
                <Globe size={14} className="mr-1" />
                Public
              </button>
            </li>
            <li className="flex-1">
              <button className="px-3 py-1 opacity-50 whitespace-nowrap flex flex-nowrap items-center justify-center">
                <Unlock size={14} className="mr-1" />
                In contact list
              </button>
            </li>
          </ul>
          <Image
            alt="businesscard"
            src={ImgBC}
            height={480}
            className="-mb-80 md:mb-0 opacity-90 mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
