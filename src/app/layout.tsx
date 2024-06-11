import ClientBody from '@/containers/client-layout'
import ReduxProvider from '@/stores'
import React from 'react'
import { Noto_Sans_TC } from 'next/font/google'
import { cookies } from 'next/headers'
import ClientCookiesProvider from '../cookie'
import './globals.css'

const noto = Noto_Sans_TC({
  weight: '500',
  subsets: ['latin']
})

interface IRootEntry {
  children: React.ReactNode
}

const RootEntry = ({ children }: IRootEntry) => {
  return (
    <html lang="en">
      <head>
        <title>{`radiabee`}</title>
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-dark-16.png`}
          sizes="16x16"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-dark-32.png`}
          sizes="32x32"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-dark-48.png`}
          sizes="48x48"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-dark-64.png`}
          sizes="64x64"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-dark-96.png`}
          sizes="96x96"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />

        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-light-16.png`}
          sizes="16x16"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-light-32.png`}
          sizes="32x32"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-light-48.png`}
          sizes="48x48"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-light-64.png`}
          sizes="64x64"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
        <link
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon/favicon-light-96.png`}
          sizes="96x96"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${noto.className} w-full bg-transparent`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  )
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <ClientCookiesProvider value={cookies().getAll()}>
        <RootEntry>{children}</RootEntry>
      </ClientCookiesProvider>
    </ReduxProvider>
  )
}

export default RootLayout
