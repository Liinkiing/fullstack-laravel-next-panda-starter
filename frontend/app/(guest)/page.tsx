import Link from 'next/link'
import type { FC } from 'react'

import { Heading } from '~/ui/heading'

const HomePage: FC = () => (
  <div>
    <Heading as="h1" size="4xl">
      Home
    </Heading>
    <main>
      <Link href="/login">Go to login page</Link>
    </main>
  </div>
)

export default HomePage
