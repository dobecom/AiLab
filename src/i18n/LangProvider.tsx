import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L } from '../content/journey/types'
import { ui } from './ui'
import { LangContext, type Lang, type LangState } from './lang'

const STORAGE_KEY = 'ailab-lang'

function readStoredLang(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'ko' ? 'ko' : 'en'
  } catch {
    return 'en'
  }
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for the session.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = ui.documentTitle[lang]
  }, [lang])

  const value = useMemo<LangState>(
    () => ({ lang, setLang, t: (text: L) => text[lang] }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
