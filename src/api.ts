import { createClient as createUrqlClient } from 'urql'

const environments = {
  testnet: 'https://api-mumbai.lens.dev',
  sandbox: 'https://api-sandbox-mumbai.lens.dev',
  mainnet: 'https://api.lens.dev'
}

/* creates the API client */
export function createClient(env = 'mainnet') {
  const APIURL = environments[env]
  return createUrqlClient({
    url: APIURL
  })
}