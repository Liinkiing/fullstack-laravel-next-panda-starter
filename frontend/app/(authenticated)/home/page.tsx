'use client'

import type { FC } from 'react'

import { useAuth } from '~/shared/hooks/useAuth'
import { Button } from '~/ui/button'

const HomePage: FC = () => {
  const { viewer, logout } = useAuth()

  return (
    <div>
      <h1>Home</h1>
      <main>
        <p>
          Hi {viewer.name} ({viewer.email})
        </p>
        <Button onClick={() => logout()}>Logout</Button>
      </main>
    </div>
  )
}

export default HomePage
