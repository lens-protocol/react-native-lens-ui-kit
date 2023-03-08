import { LensContext } from '../context'
import { Theme, Environment } from '../types'

export function LensProvider({
  children,
  theme = Theme.light,
  environment = Environment.mainnet,
  IPFSGateway = 'https://gateway.ipfscdn.io/ipfs',
}: {
  children: React.ReactNode,
  theme?: Theme,
  environment?: Environment,
  IPFSGateway?: string
}) {
  return (
    <LensContext.Provider
      value={{
        environment,
        theme,
        IPFSGateway
      }}>
      {children}
    </LensContext.Provider>
  )
}