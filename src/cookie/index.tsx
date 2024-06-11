'use client'

import React from 'react'
import { CookiesProvider } from 'next-client-cookies'

const ClientCookiesProvider: typeof CookiesProvider = (props) => (
  <CookiesProvider {...props} />
)

export default ClientCookiesProvider
