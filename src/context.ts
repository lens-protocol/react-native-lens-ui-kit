import { createContext } from 'react'
import { LensContextType } from './types'

export const LensContext = createContext<LensContextType | null>(null)