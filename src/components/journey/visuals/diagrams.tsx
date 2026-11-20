import { Fragment } from 'react'
import { useLang } from '../../../i18n/lang'
import type {
  CycleVisual,
  FlowVisual,
  HubVisual,
  LayersVisual,
  MatrixVisual,
  Node,
  SpectrumVisual,
} from '../../../content/journey/types'
import { Icon } from '../icons'
import { bracketPosition, vars } from './helpers'

export function NodeCard({ node, className = '' }: { node: Node; className?: string }) {
  const { t } = useLang()
  return (
    <div className={`node${node.key ? ' is-key' : ''} ${className}`.trim()}>
      {node.icon && (
        <span className="node-icon">
          <Icon name={node.icon} />
        </span>
      )}
      <span className="node-text">
        <span className="node-label">{t(node.label)}</span>
        {node.sub && <span className="node-sub">{t(node.sub)}</span>}
      </span>
    </div>
  )
}

export function FlowDiagram({ visual }: { visual: FlowVisual }) {
  const { t } = useLang()
  const count = visual.nodes.length
  const direction = visual.direction ?? (count > 5 ? 'col' : 'row')
  const width = count <= 4 ? 'w1' : count <= 6 ? 'w2' : 'w3'

  return (
    <div className={`flow flow-${direction} flow-${width}`} style={vars({ '--n': count })}>
      <ol className="flow-track">
        {visual.nodes.map((node, index) => (
          <li className="flow-item" key={index} style={vars({ '--i': index })}>
            <NodeCard node={node} />
            {index < count - 1 && <span className="flow-arrow" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      {visual.loop && (
        <div className="flow-loop">
          <span>{t(visual.loop)}</span>
        </div>
      )}
    </div>
  )
}

export function HubDiagram({ visual }: { visual: HubVisual }) {
  const half = Math.ceil(visual.nodes.length / 2)
  const left = visual.nodes.slice(0, half)
  const right = visual.nodes.slice(half)

  return (
    <div className="hub" style={vars({ '--rows': half })}>
      {left.map((node, index) => (
        <Fragment key={`l${index}`}>
          <div className="hub-cell" style={{ gridColumn: 1, gridRow: index + 1 }}>
            <NodeCard node={node} />
          </div>
          <div
            className="hub-bus hub-bus-left"
            data-pos={bracketPosition(index, left.length)}
            style={{ gridColumn: 2, gridRow: index + 1 }}
            aria-hidden="true"
          />
        </Fragment>
      ))}
      <div className="hub-center" style={{ gridColumn: 3, gridRow: `1 / span ${half}` }}>
        <NodeCard node={visual.center} className="node-center" />
      </div>
      {right.map((node, index) => (
        <Fragment key={`r${index}`}>
          <div
            className="hub-bus hub-bus-right"
            data-pos={bracketPosition(index, right.length)}
            style={{ gridColumn: 4, gridRow: index + 1 }}
            aria-hidden="true"
          />
          <div className="hub-cell" style={{ gridColumn: 5, gridRow: index + 1 }}>
            <NodeCard node={node} />
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export function LayersDiagram({ visual }: { visual: LayersVisual }) {
  const total = visual.layers.length
  return (
    <ol className="layers">
      {visual.layers.map((layer, index) => (
        <li
          className="layer"
          key={index}
          style={vars({ '--i': index, '--inset': `${(total - 1 - index) * 14}px` })}
        >
          <span className="layer-index" aria-hidden="true">
            {total - index}
          </span>
          <NodeCard node={layer} />
        </li>
      ))}
    </ol>
  )
}

const CYCLE = { width: 100, height: 90, cx: 50, cy: 45, rx: 37, ry: 32 }

export function CycleDiagram({ visual }: { visual: CycleVisual }) {
  const { t } = useLang()
  const count = visual.nodes.length
  const angle = (index: number) => ((-90 + (360 / count) * index) * Math.PI) / 180

  const points = visual.nodes.map((_, index) => {
    const a = angle(index)
    return {
      x: CYCLE.cx + CYCLE.rx * Math.cos(a),
      y: CYCLE.cy + CYCLE.ry * Math.sin(a),
    }
  })

  const arrows = visual.nodes.map((_, index) => {
    const a = angle(index + 0.5)
    const tangent = Math.atan2(CYCLE.ry * Math.cos(a), -CYCLE.rx * Math.sin(a))
    return {
      x: CYCLE.cx + CYCLE.rx * Math.cos(a),
      y: CYCLE.cy + CYCLE.ry * Math.sin(a),
      rotate: (tangent * 180) / Math.PI,
    }
  })

  return (
    <div className="cycle">
      <div className="cycle-stage">
        <svg className="cycle-ring" viewBox={`0 0 ${CYCLE.width} ${CYCLE.height}`} aria-hidden="true">
          <ellipse className="cycle-orbit" cx={CYCLE.cx} cy={CYCLE.cy} rx={CYCLE.rx} ry={CYCLE.ry} />
          {arrows.map((arrow, index) => (
            <polygon
              key={index}
              className="cycle-chevron"
              points="2.6,0 -1.8,2.2 -1.8,-2.2"
              transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.rotate})`}
            />
          ))}
        </svg>
        {visual.center && (
          <div className="cycle-center">
            <span>{t(visual.center)}</span>
          </div>
        )}
        {visual.nodes.map((node, index) => (
          <div
            className="cycle-node"
            key={index}
            style={vars({
              '--x': `${(points[index].x / CYCLE.width) * 100}%`,
              '--y': `${(points[index].y / CYCLE.height) * 100}%`,
              '--i': index,
            })}
          >
            <span className="cycle-index" aria-hidden="true">
              {index + 1}
            </span>
            <NodeCard node={node} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MatrixDiagram({ visual }: { visual: MatrixVisual }) {
  const { t } = useLang()
  return (
    <div className="matrix">
      <div className="matrix-y">
        <span aria-hidden="true">↑</span>
        <span className="matrix-axis-text">{t(visual.yAxis)}</span>
      </div>
      <div className="matrix-grid">
        {visual.cells.slice(0, 4).map((cell, index) => (
          <NodeCard key={index} node={cell} className={`matrix-cell matrix-cell-${index}`} />
        ))}
      </div>
      <div className="matrix-x">
        <span className="matrix-axis-text">{t(visual.xAxis)}</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>
  )
}

export function SpectrumDiagram({ visual }: { visual: SpectrumVisual }) {
  const { t } = useLang()
  return (
    <div className="spectrum">
      <div className="spectrum-ends">
        <span>{t(visual.from)}</span>
        <span>{t(visual.to)}</span>
      </div>
      <ol className="spectrum-items" style={vars({ '--n': visual.items.length })}>
        {visual.items.map((item, index) => (
          <li className="spectrum-item" key={index} style={vars({ '--i': index })}>
            <span className="spectrum-dot" aria-hidden="true" />
            <NodeCard node={item} />
          </li>
        ))}
      </ol>
    </div>
  )
}
