import { Badge, makeStyles, tokens } from '@fluentui/react-components'
import { STATUS_DESCRIPTION, STATUS_LABEL, type DeliveryStatus } from '../content/types'

const useStyles = makeStyles({
  planned: {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground2,
  },
  building: {
    backgroundColor: tokens.colorPaletteYellowBackground2,
    color: tokens.colorNeutralForeground1,
  },
  published: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorNeutralForeground1,
  },
})

interface StatusTagProps {
  status: DeliveryStatus
  label?: string
}

export default function StatusTag({ status, label }: StatusTagProps) {
  const styles = useStyles()

  return (
    <Badge
      appearance="filled"
      shape="rounded"
      size="medium"
      className={styles[status]}
      title={STATUS_DESCRIPTION[status]}
    >
      {label ? `${label}: ${STATUS_LABEL[status]}` : STATUS_LABEL[status]}
    </Badge>
  )
}
