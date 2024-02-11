import Link from 'next/link'
import type { FC } from 'react'

const HomePage: FC = () => (
  <div>
    <h1>Hello</h1>
    <main>
      <Link href="/login">Go to login page</Link>
    </main>
  </div>
)

export default HomePage
