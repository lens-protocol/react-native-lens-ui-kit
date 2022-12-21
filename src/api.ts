import { createClient as createUrqlClient } from 'urql'
import { Environment } from './types'

const environments = {
  testnet: 'https://api-mumbai.lens.dev',
  sandbox: 'https://api-sandbox-mumbai.lens.dev',
  mainnet: 'https://api.lens.dev'
}

/* creates the API client */
export function createClient(env:Environment = Environment.mainnet) {
  const APIURL = environments[env] || environments.mainnet
  return createUrqlClient({
    url: APIURL
  })
}