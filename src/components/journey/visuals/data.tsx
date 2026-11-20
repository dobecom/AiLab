import { Fragment } from 'react'
import { useLang } from '../../../i18n/lang'
import type {
  BarsVisual,
  CodeVisual,
  CompareVisual,
  StatsVisual,
  StepsVisual,
  TilesVisual,
} from '../../../content/journey/types'
import { Icon } from '../icons'
import { vars } from './helpers'

export function CompareTable({ visual }: { visual: CompareVisual }) {
  const { t } = useLang()
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label={t(visual.title)}>
      <table className="compare">
        <thead>
          <tr>
            <td />
            {visual.columns.map((column, index) => (
              <th scope="col" key={index} className={column.key ? 'is-key' : undefined}>
                <span>{t(column.label)}</span>
                {column.sub && <small>{t(column.sub)}</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visual.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row">{t(row.label)}</th>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className={visual.columns[cellIndex]?.key ? 'is-key' : undefined}>
                  {t(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BarsChart({ visual }: { visual: BarsVisual }) {
  const { t } = useLang()
  const rows = visual.items.length
  return (
    <div className="bars">
      <div className="bars-plot" style={{ gridTemplateRows: `repeat(${rows}, auto)` }}>
        {visual.items.map((item, index) => (
          <Fragment key={index}>
            <span className="bar-label" style={{ gridColumn: 1, gridRow: index + 1 }}>
              {t(item.label)}
            </span>
            <div className="bar-track" style={{ gridColumn: 2, gridRow: index + 1 }}>
              <i
                className={`bar-fill${item.key ? ' is-key' : ''}`}
                style={vars({ '--w': `${item.value}%`, '--i': index })}
              />
            </div>
            <span className="bar-value" style={{ gridColumn: 3, gridRow: index + 1 }}>
              {item.display ?? `${item.value}%`}
            </span>
          </Fragment>
        ))}
        {visual.marker && (
          <div className="bar-marker-layer" style={{ gridColumn: 2, gridRow: `1 / span ${rows}` }}>
            <span className="bar-marker" style={{ left: `${visual.marker.value}%` }}>
              <em>{t(visual.marker.label)}</em>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function StepsList({ visual }: { visual: StepsVisual }) {
  const { t } = useLang()
  return (
    <ol className="steps">
      {visual.steps.map((step, index) => (
        <li className="step" key={index} style={vars({ '--i': index })}>
          <span className="step-num" aria-hidden="true">
            {index + 1}
          </span>
          <span className="step-body">
            <strong>{t(step.label)}</strong>
            {step.text && <span>{t(step.text)}</span>}
          </span>
          {step.icon && (
            <span className="step-icon">
              <Icon name={step.icon} />
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

export function StatsGrid({ visual }: { visual: StatsVisual }) {
  const { t } = useLang()
  return (
    <ul className="stats">
      {visual.items.map((item, index) => (
        <li className={`stat${item.key ? ' is-key' : ''}`} key={index} style={vars({ '--i': index })}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{t(item.label)}</span>
          {item.sub && <span className="stat-sub">{t(item.sub)}</span>}
        </li>
      ))}
    </ul>
  )
}

export function TilesGrid({ visual }: { visual: TilesVisual }) {
  const { t } = useLang()
  return (
    <ul className="tiles" data-columns={visual.columns ?? 3}>
      {visual.items.map((item, index) => (
        <li className={`tile${item.key ? ' is-key' : ''}`} key={index} style={vars({ '--i': index })}>
          <span className="tile-icon">
            <Icon name={item.icon} />
          </span>
          <span className="tile-label">{t(item.label)}</span>
          {item.sub && <span className="tile-sub">{t(item.sub)}</span>}
          {item.tag && <span className="tile-tag">{t(item.tag)}</span>}
        </li>
      ))}
    </ul>
  )
}

interface Token {
  text: string
  kind?: 'comment' | 'string' | 'keyword' | 'number'
}

const KEYWORDS =
  'from|import|def|return|for|in|with|as|if|else|elif|print|class|try|except|while|lambda|and|or|not|is|None|True|False|true|false|null'
const TOKEN_PATTERN = new RegExp(
  `(#.*$)|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')|\\b(${KEYWORDS})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`,
  'g',
)

function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const start = match.index ?? 0
    if (start > last) tokens.push({ text: line.slice(last, start) })
    const kind = match[1] ? 'comment' : match[2] ? 'string' : match[3] ? 'keyword' : 'number'
    tokens.push({ text: match[0], kind })
    last = start + match[0].length
  }
  if (last < line.length) tokens.push({ text: line.slice(last) })
  return tokens
}

export function CodePanel({ visual }: { visual: CodeVisual }) {
  const { t } = useLang()
  const highlighted = new Set(visual.highlight ?? [])
  const lines = visual.code.split('\n')

  return (
    <div className="code" tabIndex={0} role="region" aria-label={t(visual.title)}>
      <div className="code-bar">
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-lang">{visual.lang}</span>
      </div>
      <pre>
        <code>
          {lines.map((line, index) => (
            <span className={`code-line${highlighted.has(index) ? ' is-hl' : ''}`} key={index}>
              <span className="code-ln" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-text">
                {line.length === 0
                  ? ' '
                  : tokenize(line).map((token, tokenIndex) => (
                      <span key={tokenIndex} className={token.kind ? `tk-${token.kind}` : undefined}>
                        {token.text}
                      </span>
                    ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
