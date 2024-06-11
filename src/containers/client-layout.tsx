'use client'

import Dialog from '@/components/Dialog'
import DialogProvider from '@/providers/dialog'
import RoutesProvider from '@/providers/routes'
import React from 'react'
import LocaleProvider from '../providers/i18n'
import StatusProvider from '../providers/status'

interface IRootEntry {
  children: React.ReactNode
}

const ClientBody = ({ children }: IRootEntry) => {
  return (
    <StatusProvider>
      <LocaleProvider>
        <RoutesProvider>
          <DialogProvider>
            <Dialog />
            {children}
          </DialogProvider>
        </RoutesProvider>
      </LocaleProvider>
    </StatusProvider>
  )
}

export default ClientBody
