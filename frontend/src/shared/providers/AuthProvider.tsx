'use client'

import { useQuery } from '@apollo/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { runIfFn } from '@zag-js/utils'
import type { FC, ReactNode } from 'react'
import { createContext, useMemo } from 'react'

import type { ViewerQuery } from '~/__generated__/gql/graphql'
import { ViewerDocument } from '~/__generated__/gql/graphql'
import { AuthService, LOGGED_IN_URL, LOGIN_URL } from '~/services/auth'
import { Redirect } from '~/shared/components/Redirect'
import { Button } from '~/ui/button'

export type Viewer = NonNullable<ViewerQuery['viewer']>

type RenderProps = ReactNode | ((viewer: Viewer) => ReactNode)

interface Props {
  children: RenderProps
  mode: 'guest' | 'authenticated' | 'all'
}

interface Context {
  viewer: Viewer | null
}

export const AuthContext = createContext<Context>({
  viewer: null,
})

export const AuthProvider: FC<Props> = ({ children, mode }) => {
  const { data, error, loading } = useQuery(ViewerDocument, {
    skip: mode === 'guest' || !AuthService.isLoggedIn,
  })

  const context = useMemo<Context>(
    () => ({
      viewer: data?.viewer ?? null,
    }),
    [data],
  )

  if (loading) {
    return <p>Loading...</p>
  }

  if (!AuthService.isLoggedIn && mode === 'authenticated') {
    const redirectUrl = `${LOGIN_URL}?return_to=${encodeURIComponent(window.location.pathname)}`
    return <Redirect to={redirectUrl} />
  }

  if (AuthService.isLoggedIn && mode === 'guest') {
    return <Redirect to={LOGGED_IN_URL} />
  }

  if (error) {
    return (
      <div>
        <h1>An error occurred</h1>
        <main>
          <p>See the following message</p>
          <code>
            <pre>{error.message}</pre>
          </code>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </main>
      </div>
    )
  }

  return <AuthContext.Provider value={context}>{runIfFn(children, context.viewer!)}</AuthContext.Provider>
}
