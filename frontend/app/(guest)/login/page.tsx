'use client'

import type { FC } from 'react'

import { useAuth } from '~/shared/hooks/useAuth'
import { Button } from '~/ui/button'
import { Heading } from '~/ui/heading'

const LoginPage: FC = () => {
  const { loginWithProvider } = useAuth()

  return (
    <div>
      <Heading as="h1" size="4xl">
        Login
      </Heading>
      <main>
        <Button onClick={() => loginWithProvider('google')}>Connect with Google</Button>
      </main>
    </div>
  )
}

export default LoginPage
