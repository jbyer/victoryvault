import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VictoryVault',
  description: 'Created by Jason Byer',
  generator: 'Jason Byer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
