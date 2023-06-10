import { Analytics } from '@vercel/analytics/react'
import { Inter, Major_Mono_Display, Space_Mono } from 'next/font/google'
import '@/assets/css/main.css'
// import { Toaster } from 'ui/components/Toaster'
import MetaTags from '@/components/MetaTags'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <MetaTags />
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${mmd.variable} ${space.variable}`}
      >
        {children}
        {/* <Toaster position="top-center" toastOptions={toastOptions} /> */}
      </body>
      <Analytics />
    </html>
  )
}
