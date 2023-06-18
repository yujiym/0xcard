import { Share, QrCode, ClipboardCopy } from 'lucide-react'
import QRCode from 'react-qr-code'
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
import { wait, copyClipboard } from '@/lib/utils'
import { siteUrl } from '@0xcard/lib/const'

type Props = {
  cid: string
  name: string
  klass?: string
}

export default function ShareButton({ cid, name, klass = '' }: Props) {
  const { toast } = useToast()

  const copyToClipboard = async (str: string) => {
    copyClipboard(str)
    await wait(250)
    toast({
      description: 'Copied to the clipboard!',
    })
  }

  return cid ? (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full h-full flex items-center justify-center">
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
              onClick={() => copyToClipboard(`${siteUrl}/${cid}`)}
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
            {name} QR
          </DialogTitle>
          <DialogDescription className="mx-auto">
            <QRCode
              value={`${siteUrl}/${cid}`}
              bgColor="transparent"
              fgColor="hsl(var(--primary))"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ) : null
}
