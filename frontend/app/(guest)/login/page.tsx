'use client'

import type { FC } from 'react'

import { useAuth } from '~/shared/hooks/useAuth'
import { Button } from '~/ui/button'

const LoginPage: FC = () => {
  const { loginWithProvider } = useAuth()

  return (
    <div>
      <h1>Login</h1>
      <main>
        <Button onClick={() => loginWithProvider('google')}>Connect with Google</Button>
      </main>
    </div>
  )
}

export default LoginPage
