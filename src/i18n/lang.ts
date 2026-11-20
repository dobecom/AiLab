import { createContext, useContext } from 'react'
import type { L } from '../content/journey/types'

export type Lang = 'en' | 'ko'

export interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Resolves a bilingual string for the active language. */
  t: (text: L) => string
}

export const LangContext = createContext<LangState>({
  lang: 'en',
  setLang: () => undefined,
  t: (text) => text.en,
})

export const useLang = (): LangState => useContext(LangContext)
