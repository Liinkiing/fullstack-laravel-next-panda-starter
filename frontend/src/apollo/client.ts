/* eslint-disable unicorn/prefer-node-protocol */
import { ApolloClient, from, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import * as http from 'http'
import * as https from 'https'
import Cookies from 'js-cookie'

import introspection from '~/__generated__/gql/possibleTypes.json'
import { errorLink } from '~/apollo/links'
import { typePolicies } from '~/apollo/policies'

export const XSRF_TOKEN_COOKIE_NAME = 'XSRF-TOKEN'

const customFetch: typeof fetch = (uri, options) => {
  // @ts-ignore
  options.headers['X-XSRF-TOKEN'] = Cookies.get(XSRF_TOKEN_COOKIE_NAME)

  return fetch(uri, options)
}

const httpLink = createUploadLink({
  fetch: customFetch,
  fetchOptions: {
    agent: __DEV__ ? new http.Agent() : new https.Agent({ rejectUnauthorized: !__DEV__ }),
  },
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? '/api/graphql',
  credentials: 'include',
})

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  connectToDevTools: __DEV__,
  defaultOptions: {
    query: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first',
    },
  },
  cache: new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
    typePolicies,
  }),
  link: from([errorLink as any, httpLink]),
})
