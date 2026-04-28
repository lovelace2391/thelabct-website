import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Lab CT — Dance Studio | Danbury, Connecticut',
  description:
    'A creative space for movement. Hip-hop, heels, jazz, ballet, contemporary and more. Located in Danbury, CT. Est. 2014.',
  keywords: 'dance studio, Danbury CT, hip-hop dance, heels dance, contemporary, ballet, jazz, Connecticut',
  openGraph: {
    title: 'The Lab CT — Dance Studio',
    description: 'A creative space for movement. Danbury, Connecticut.',
    url: 'https://thelabct.com',
    siteName: 'The Lab CT',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
