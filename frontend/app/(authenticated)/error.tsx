'use client'

import type { ErrorComponent } from 'next/dist/client/components/error-boundary'

import { Button } from '~/ui/button'

const Error: ErrorComponent = ({ error, reset }) => {
  return (
    <div>
      <h1>An error occurred</h1>
      <main>
        <p>See the following message</p>
        <code>
          <pre>{error.message}</pre>
        </code>
        <Button onClick={() => reset()}>Retry</Button>
      </main>
    </div>
  )
}

export default Error
