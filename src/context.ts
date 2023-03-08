import { createContext } from 'react'
import {
  LensContextType,
  Environment,
  Theme
} from './types'

export const LensContext = createContext<LensContextType>({
  environment: Environment.mainnet,
  IPFSGateway: 'https://gateway.ipfscdn.io/ipfs',
  theme: Theme.light
})
