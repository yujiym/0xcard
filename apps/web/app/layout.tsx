import { Analytics } from '@vercel/analytics/react'
import { Inter, Major_Mono_Display, Space_Mono } from 'next/font/google'
import '@/assets/css/main.css'
import MetaTags from '@/components/MetaTags'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
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
      </body>
      <Analytics />
    </html>
  )
}
