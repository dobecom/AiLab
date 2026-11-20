import { useLang } from '../../../i18n/lang'
import type { Visual } from '../../../content/journey/types'
import {
  CycleDiagram,
  FlowDiagram,
  HubDiagram,
  LayersDiagram,
  MatrixDiagram,
  SpectrumDiagram,
} from './diagrams'
import { BarsChart, CodePanel, CompareTable, StatsGrid, StepsList, TilesGrid } from './data'

function VisualBody({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'flow':
      return <FlowDiagram visual={visual} />
    case 'hub':
      return <HubDiagram visual={visual} />
    case 'layers':
      return <LayersDiagram visual={visual} />
    case 'cycle':
      return <CycleDiagram visual={visual} />
    case 'matrix':
      return <MatrixDiagram visual={visual} />
    case 'compare':
      return <CompareTable visual={visual} />
    case 'spectrum':
      return <SpectrumDiagram visual={visual} />
    case 'bars':
      return <BarsChart visual={visual} />
    case 'steps':
      return <StepsList visual={visual} />
    case 'stats':
      return <StatsGrid visual={visual} />
    case 'code':
      return <CodePanel visual={visual} />
    case 'tiles':
      return <TilesGrid visual={visual} />
  }
}

export default function VisualRenderer({ visual }: { visual: Visual }) {
  const { t } = useLang()
  return (
    <figure className={`visual visual-${visual.kind}`}>
      <figcaption className="visual-title">{t(visual.title)}</figcaption>
      <div className="visual-body">
        <VisualBody visual={visual} />
      </div>
      {visual.caption && <p className="visual-caption">{t(visual.caption)}</p>}
    </figure>
  )
}
