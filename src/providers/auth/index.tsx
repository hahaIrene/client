import { useLazyProfileQuery, useSignInMutation } from '@/stores/api/auth'
import React, { createContext, useState } from 'react'
import sha256 from 'sha256'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'

export interface IUserPayload {
  id: string
  email: string
  isAdmin: boolean
  isRoot: boolean
}

interface IAuthContext {
  user: IUserPayload | undefined
  loginEmail: string
  loginPassword: string
  isLoading: boolean
  errorMsg: string | undefined
  onloginEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onloginPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  signIn: () => void
  logOut: () => void
  getProfile: (access_token: string) => void
}

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  loginEmail: '',
  loginPassword: '',
  isLoading: false,
  errorMsg: undefined,
  onloginEmailChange: () => {},
  onloginPasswordChange: () => {},
  signIn: () => {},
  logOut: () => {},
  getProfile: () => {}
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const cookie = useCookies()
  const [loginEmail, setloginEmail] = useState<string>('')
  const [loginPassword, setloginPassword] = useState<string>('')
  const [user, setuser] = useState<IUserPayload | undefined>(undefined)
  const [errorMsg, seterrorMsg] = useState<string | undefined>(undefined)
  const [triggerSignIn, { isLoading }] = useSignInMutation()
  const [triggerProfile] = useLazyProfileQuery()

  const signIn = async () => {
    const orgCode = cookie.get('orgCode')
    if (!orgCode) return
    seterrorMsg(undefined)
    const response = await triggerSignIn({
      email: loginEmail,
      password: sha256.x2(loginPassword),
      orgCode
    })
    if ('data' in response) {
      cookie.set('token', response.data.access_token)
      router.push(`/${orgCode}`)
      return
    }
    if ('error' in response && 'data' in response.error) {
      const error = response.error.data as { message: string }
      seterrorMsg(error.message)
    }
  }

  const logOut = async () => {
    const orgCode = cookie.get('orgCode')
    cookie.remove('token')
    router.push(`/${orgCode}/signIn`)
  }

  const getProfile = async (access_token: string) => {
    const response = await triggerProfile({ access_token })
    if ('data' in response && response.data) {
      setuser({
        id: response.data.sub,
        email: response.data.email,
        isAdmin: response.data.isAdmin,
        isRoot: response.data.isRoot
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginEmail,
        loginPassword,
        isLoading,
        errorMsg,
        onloginEmailChange: (e) => {
          setloginEmail(e.target.value)
        },
        onloginPasswordChange: (e) => {
          setloginPassword(e.target.value)
        },
        signIn,
        logOut,
        getProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
