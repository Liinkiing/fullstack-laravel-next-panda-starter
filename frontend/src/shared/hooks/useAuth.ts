import { useCallback, useContext, useMemo } from 'react'

import { graphql } from '~/__generated__/gql'
import type { AuthProvider } from '~/services/auth'
import { AuthService } from '~/services/auth'
import type { Viewer } from '~/shared/providers/AuthProvider'
import { AuthContext } from '~/shared/providers/AuthProvider'

type Return = {
  isAuthenticated: boolean
  viewer: Viewer
  loginWithProvider: typeof AuthService.loginWithProvider
  login: typeof AuthService.login
  logout: typeof AuthService.logout
}

export const useAuth = (): Return => {
  const context = useContext(AuthContext)

  const logout = useCallback(() => {
    return AuthService.logout()
  }, [])

  const loginWithProvider = useCallback((provider: AuthProvider) => {
    return AuthService.loginWithProvider(provider)
  }, [])

  const login = useCallback(({ email, password }: { email: string; password: string }) => {
    const returnTo = new URLSearchParams(window.location.search).get('return_to')
    return AuthService.login({
      returnTo,
      email,
      password,
    })
  }, [])

  return useMemo<Return>(
    () => ({
      isAuthenticated: AuthService.isLoggedIn,
      viewer: context.viewer as NonNullable<Viewer>,
      login,
      loginWithProvider,
      logout,
    }),
    [context.viewer, login, loginWithProvider, logout],
  )
}

graphql(`
  query Viewer {
    viewer {
      id
      email
      name
    }
  }
`)
