import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { AppProviders } from '~/shared/providers/AppProviders'
import { CsrfProvider } from '~/shared/providers/CsrfProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fullstack App',
  description: 'Your next fullstack app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <CsrfProvider>
          <AppProviders>{children}</AppProviders>
        </CsrfProvider>
      </body>
    </html>
  )
}
