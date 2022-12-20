import { LensContext } from '../context'

export function LensProvider({
  children, ...props
}) {
  return (
    <LensContext.Provider value={props}>
      {children}
    </LensContext.Provider>
  )
}