import React, { createContext, useRef, useState } from 'react'

interface IDialogContext {
  open: boolean
  title: string
  message: string
  onOpen: (title: string, message: string, callback: () => void) => void
  onClose: () => void
  onApply: () => void
}

export const DialogContext = createContext<IDialogContext>({
  open: false,
  title: '',
  message: '',
  onOpen: () => {},
  onClose: () => {},
  onApply: () => {}
})

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setopen] = useState<boolean>(false)
  const [title, settitle] = useState<string>('')
  const [message, setmessage] = useState<string>('')
  // const [callback, setcallback] = useState<undefined | (() => void)>(undefined)
  const callbackRef = useRef(() => {})

  return (
    <DialogContext.Provider
      value={{
        open,
        title,
        message,
        onOpen: (title, message, cf) => {
          setopen(true)
          settitle(title)
          setmessage(message)
          callbackRef.current = cf
        },
        onApply: () => {
          callbackRef.current()
          setopen(false)
        },
        onClose: () => {
          setopen(false)
        }
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider
