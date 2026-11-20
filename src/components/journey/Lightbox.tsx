import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-components'
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons'
import { useLang } from '../../i18n/lang'
import { ui } from '../../i18n/ui'
import type { Evidence } from '../../content/journey/types'
import sizes from '../../content/journey/imageSizes.json'

const IMAGE_SIZES = sizes as unknown as Record<string, [number, number]>

interface LightboxProps {
  items: Evidence[]
  /** Index of the open capture, or null when closed. */
  index: number | null
  onChange: (index: number | null) => void
}

export default function Lightbox({ items, index, onChange }: LightboxProps) {
  const { t } = useLang()
  const item = index === null ? undefined : items[index]
  const [width, height] = item ? (IMAGE_SIZES[String(item.img)] ?? [1280, 720]) : [1280, 720]
  const total = items.length

  const move = (delta: number) => {
    if (index === null) return
    onChange((index + delta + total) % total)
  }

  return (
    <Dialog
      open={item !== undefined}
      onOpenChange={(_, data) => {
        if (!data.open) onChange(null)
      }}
    >
      <DialogSurface
        className="lightbox"
        aria-describedby={undefined}
        onKeyDown={(event) => {
          if (total < 2) return
          if (event.key === 'ArrowRight') move(1)
          else if (event.key === 'ArrowLeft') move(-1)
        }}
      >
        <DialogBody>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label={t(ui.closeLightbox)}
                icon={<Dismiss24Regular />}
                onClick={() => onChange(null)}
              />
            }
          >
            {item ? t(item.caption) : ''}
          </DialogTitle>
          <DialogContent className="lightbox-content">
            {item && (
              <img
                className="lightbox-image"
                src={`/img/foundry/img${item.img}.png`}
                width={width}
                height={height}
                alt={t(item.caption)}
                decoding="async"
              />
            )}
            {total > 1 && index !== null && (
              <div className="lightbox-nav">
                <Button
                  appearance="subtle"
                  icon={<ChevronLeft24Regular />}
                  aria-label={t(ui.prevCapture)}
                  onClick={() => move(-1)}
                />
                <span aria-live="polite">{t(ui.captureOf(index + 1, total))}</span>
                <Button
                  appearance="subtle"
                  icon={<ChevronRight24Regular />}
                  aria-label={t(ui.nextCapture)}
                  onClick={() => move(1)}
                />
              </div>
            )}
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
