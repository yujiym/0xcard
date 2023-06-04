import { Inter, Major_Mono_Display, Space_Mono } from 'next/font/google'
import '../assets/css/main.css'
// import { Toaster } from 'ui/components/Toaster'
import { siteTitle, siteDescription } from '@0xcard/lib/const'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})

const mmd = Major_Mono_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mmd',
})

const space = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sm',
})

const toastOptions = {
  style: {
    border: 'none',
    padding: '0.85rem 1.25rem',
    color: '#EEEDE9',
    background: '#3247BC',
  },
}

const PwaTags = (): JSX.Element => (
  <>
    <meta name="application-name" content={siteTitle} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content={siteTitle} />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-TileColor" content="#3F51B5" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="theme-color" content="#3F51B5" />
    <link
      rel="icon"
      type="image/png"
      sizes="512x512"
      href="/icon-512x512.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="384x384"
      href="/icon-384x384.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="256x256"
      href="/icon-256x256.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/icon-192x192.png"
    />
    <link rel="manifest" href="/manifest.json" />
  </>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <PwaTags />
      <link rel="icon" href="/favicon.ico" />
      <body className={`${inter.variable} ${mmd.variable} ${space.variable}`}>
        {children}
        {/* <Toaster position="top-center" toastOptions={toastOptions} /> */}
      </body>
    </html>
  )
}
