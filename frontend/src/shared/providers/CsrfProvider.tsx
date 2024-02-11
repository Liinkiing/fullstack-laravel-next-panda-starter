'use client'

import { AxiosError } from 'axios'
import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { ApiService } from '~/services/api'
import { AuthService } from '~/services/auth'
import { Button } from '~/ui/button'

interface Props {
  children: ReactNode
}

export const CsrfProvider: FC<Props> = ({ children }) => {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const doFetchCsrf = async () => {
      try {
        await ApiService.csrf()
        setReady(true)
      } catch (error_) {
        if (error_ instanceof AxiosError) {
          if (error_.response?.status === 401) {
            await AuthService.logout()
          } else {
            setError(error_)
          }
        }
      }
    }
    doFetchCsrf()
  }, [])

  if (error) {
    return (
      <div>
        <h1>An error occurred</h1>
        <main>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </main>
      </div>
    )
  }

  if (!ready) {
    return <p>Loading...</p>
  }

  return children
}
