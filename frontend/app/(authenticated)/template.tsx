'use client'

import { motion } from 'framer-motion'
import type { FC, ReactNode } from 'react'

import { SMOOTH_EASE } from '~/utils/framer'

interface Props {
  children: ReactNode
}

const AuthenticatedTemplate: FC<Props> = ({ children }) => (
  <motion.div
    animate={{
      opacity: 1,
      x: 0,
    }}
    exit={{
      opacity: 0,
      x: -10,
    }}
    initial={{
      opacity: 0,
      x: -10,
    }}
    transition={SMOOTH_EASE}
  >
    {children}
  </motion.div>
)

export default AuthenticatedTemplate
