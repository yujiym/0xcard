'use client'
import React from 'react'
import Link from 'next/link'
import { useIsAuthenticated } from '@polybase/react'
import { Edit3, Share, QrCode, ClipboardCopy } from 'lucide-react'
import QRCode from 'react-qr-code'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import SigninScreen from '@/components/SigninScreen'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { useToast } from '@/hooks/useToast'
import { wait } from '@/lib/utils'

export default function Page() {
  const { toast } = useToast()
  const [isLoggedIn, loading] = useIsAuthenticated()

  const copyToClipboard = async (str: string) => {
    navigator.clipboard.writeText(str)
    await wait(250)
    toast({
      description: 'Copied to the clipboard 📋',
    })
  }

  return (
    <>
      {loading && <Loader />}
      {isLoggedIn ? (
        <>
          <Header>
            <div className="flex justify-between w-full items-center">
              <span>My profile</span>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger className="">
                    <Share size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-primary bg-background rounded-sm mt-2">
                    <DropdownMenuItem className="px-3 py-2">
                      <DialogTrigger className="flex items-center">
                        <QrCode size={18} className="mr-2" />
                        Show QR code
                      </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="px-3 py-2">
                      <button
                        className="flex items-center"
                        onClick={
                          () => copyToClipboard('https://0x.cards/cid1234') // TODO: update url
                        }
                      >
                        <ClipboardCopy size={18} className="mr-2" />
                        Copy URL
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent className="w-96 pt-10 pb-12">
                  <DialogHeader>
                    <DialogTitle className="font-mono text-center mb-6 text-xl">
                      My QR code
                    </DialogTitle>
                    <DialogDescription className="mx-auto">
                      <QRCode
                        value={'https://0x.cards/cid1234'} // TODO: update url
                        bgColor="transparent"
                        fgColor="hsl(var(--primary))"
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Header>
          <main className="container-sm"></main>
          <Link
            href="/profile/edit"
            className="fixed right-4 md:bottom-3 bottom-16 z-50 rounded-full h-16 w-16 flex justify-center items-center text-background bg-primary border-4 border-background"
          >
            <Edit3 />
          </Link>
          <Nav />
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  )
}
