import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ARBOR AI — AI-Powered Tree Health Intelligence',
  description:
    'ARBOR AI transforms three photographs of a tree into an understandable health intelligence report using multimodal AI vision. See. Analyze. Protect.',
  generator: 'v0.app',
  openGraph: {
    title: 'ARBOR AI — AI-Powered Tree Health Intelligence',
    description: 'See. Analyze. Protect. Multimodal AI tree health intelligence.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#06110d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
