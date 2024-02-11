import type { FC, ReactNode } from 'react'

import { AuthProvider } from '~/shared/providers/AuthProvider'

interface Props {
  children: ReactNode
}

const AuthenticatedLayout: FC<Props> = ({ children }) => {
  return <AuthProvider mode="authenticated">{children}</AuthProvider>
}

export default AuthenticatedLayout
