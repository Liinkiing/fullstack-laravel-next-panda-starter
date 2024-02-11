import type { FC, ReactNode } from 'react'

import { AuthProvider } from '~/shared/providers/AuthProvider'

interface Props {
  children: ReactNode
}

const UnauthenticatedLayout: FC<Props> = ({ children }) => {
  return <AuthProvider mode="guest">{children}</AuthProvider>
}

export default UnauthenticatedLayout
