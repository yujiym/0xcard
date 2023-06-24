import Link from 'next/link'
import Image from 'next/image'
import { Globe, Unlock, FileQuestion } from 'lucide-react'
import ImgBC1 from 'assets/img/bc-public.png'
import ImgBC2 from 'assets/img/bc-friends.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { siteTitle, siteDescription } from '@0xcard/lib/const'

export const metadata = {
  title: siteDescription,
}

export default function TopPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row flex-1">
      <div className="flex flex-1 items-center justify-center">
        <div className="py-12">
          <h1 className="text-6xl mb-3 font-title">{siteTitle}</h1>
          <h2 className="text-2xl mb-12 mx-2">
            <span className="highlight-top">カード</span>プロトコル
          </h2>
          <h2 className="text-xl font-mono italic">
            <p>Decentrilized</p>
            <p>business card protocol</p>
            <p>with privacy</p>
          </h2>
          <ul className="pt-12 text-sm">
            <li>
              <Link
                className="flex items-center"
                href="/img/how-it-works.png"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FileQuestion size={18} className="mr-1.5" />
                How it works?
              </Link>
            </li>
          </ul>
          <Link
            className="text-lg border-2 border-primary pr-5 pl-6 py-2 mt-10 inline-block font-mono"
            href="/profile"
          >
            Start
          </Link>
          <p className="text-xs mt-1.5 underline decoration-red-300">
            This is an experimental version.
            <br />
            The code and data may heavily change.
            <br />
            Please use at your own risk.
          </p>
        </div>
      </div>
      <div className="flex md:flex-1 flex-auto items-center justify-center bg-primary text-background px-8 overflow-hidden">
        <div>
          <Tabs defaultValue="public" className="w-[240]">
            <TabsList className="mb-4 w-full bg-gray-200/50 text-primary rounded-sm px-1 py-0.5 h-9">
              <TabsTrigger
                value="public"
                className="flex-1 data-[state=active]:bg-gray-200/90 data-[state=active]:text-primary rounded-sm text-xs"
              >
                <Globe size={14} className="mr-1" />
                Public
              </TabsTrigger>
              <TabsTrigger
                value="private"
                className="flex-1 data-[state=active]:bg-gray-200/90 data-[state=active]:text-primary rounded-sm text-xs"
              >
                <Unlock size={14} className="mr-1" />
                In contact list
              </TabsTrigger>
            </TabsList>
            <TabsContent value="public">
              <Image
                alt="businesscard"
                src={ImgBC1}
                width={240}
                className="-mb-80 md:mb-0 opacity-90 mx-auto"
              />
            </TabsContent>
            <TabsContent value="private">
              <Image
                alt="businesscard"
                src={ImgBC2}
                width={240}
                className="-mb-80 md:mb-0 opacity-90 mx-auto"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
