import Link from 'next/link'
import Image from 'next/image'
import { Globe, Unlock, FileQuestion } from 'lucide-react'
import ImgBC from 'assets/img/bc.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
            className="text-lg border-2 border-primary pr-5 pl-6 py-2 mt-10 inline-block font-mono"
            href="/profile"
          >
            Start
          </Link>
        </div>
      </div>
      <div className="flex md:flex-1 flex-auto items-center justify-center bg-primary text-background p-8 overflow-hidden">
        <div>
          <Tabs defaultValue="public" className="w-[240]">
            <TabsList className="mb-2 w-full bg-gray-200/50 text-primary rounded-sm px-1 py-0.5 h-9">
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
                src={ImgBC}
                width={240}
                className="-mb-80 md:mb-0 opacity-90 mx-auto"
              />
            </TabsContent>
            <TabsContent value="private">
              <Image
                alt="businesscard"
                src={ImgBC}
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
