/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'

import { conditions } from '~/theme/conditions'
import { keyframes } from '~/theme/keyframes'
import { recipes, slotRecipes } from '~/theme/recipes'
import { textStyles } from '~/theme/text-styles'
import { animations } from '~/theme/tokens/animations'
import { durations } from '~/theme/tokens/durations'
import { easings } from '~/theme/tokens/easings'
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights } from '~/theme/tokens/typography'
import { zIndex } from '~/theme/tokens/z-index'

export default defineConfig({
  presets: [pandaPreset],
  conditions,
  theme: {
    extend: {
      tokens: {
        animations,
        durations,
        easings,
        fonts,
        zIndex,
        fontSizes,
        fontWeights,
        letterSpacings,
        lineHeights,
      },
      textStyles,
      keyframes,
      recipes,
      slotRecipes,
    },
  },
  // hash: true,
  jsxFramework: 'react',
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],

  outdir: './src/styled-system',
})
