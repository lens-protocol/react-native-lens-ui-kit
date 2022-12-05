import { createClient } from 'urql'

const APIURL = 'https://api.lens.dev'

/* create the API client */
export const client = createClient({
  url: APIURL
})