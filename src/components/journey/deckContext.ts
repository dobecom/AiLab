import { createContext, useContext } from 'react'

export interface DeckState {
  activeId: string
  goTo: (id: string) => void
}

export const DeckContext = createContext<DeckState>({ activeId: 'cover', goTo: () => undefined })

export const useDeck = (): DeckState => useContext(DeckContext)
