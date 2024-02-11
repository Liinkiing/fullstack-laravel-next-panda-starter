import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: ['./client.schema.graphql', './schema.graphql'],
  documents: [
    'src/**/*.tsx',
    'app/**/*.tsx',
    'src/**/*.ts',
    'app/**/*.ts',
    'src/**/*.graphql',
    'app/**/*.graphql',
    '!src/__generated__/gql/**/*',
  ],
  generates: {
    'src/__generated__/gql/apollo-helpers.ts': {
      plugins: ['typescript-apollo-client-helpers'],
      config: {
        useTypeImports: true,
      },
    },
    'src/__generated__/gql/possibleTypes.json': {
      plugins: ['fragment-matcher'],
    },
    'src/__generated__/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
      config: {
        scalars: {
          DateTime: 'string',
          URI: 'string',
          HTML: 'string',
        },
        dedupeFragments: true,
        nonOptionalTypename: true,
        useTypeImports: true,
        avoidOptionals: {
          inputValue: false,
        },
      },
      plugins: [],
    },
  },
}

export default config
