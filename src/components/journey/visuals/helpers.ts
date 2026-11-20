import type { CSSProperties } from 'react'

/** Builds an inline style that carries CSS custom properties. */
export function vars(values: Record<string, string | number>): CSSProperties {
  return values as unknown as CSSProperties
}

/** Position of a row inside a bracket so the connector can be drawn per cell. */
export function bracketPosition(index: number, total: number): 'only' | 'first' | 'mid' | 'last' {
  if (total <= 1) return 'only'
  if (index === 0) return 'first'
  return index === total - 1 ? 'last' : 'mid'
}
