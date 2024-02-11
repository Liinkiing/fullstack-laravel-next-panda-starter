/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'

import { buttonRecipe } from '~/theme/recipes/button'

export default defineConfig({
  presets: [pandaPreset],
  conditions: {
    extend: {
      groupHover: '[role=group]:where(:hover, [data-hover]) &',
    },
  },
  theme: {
    extend: {
      recipes: {
        button: buttonRecipe,
      },
    },
  },
  // hash: true,
  jsxFramework: 'react',
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],

  outdir: './src/styled-system',
})
