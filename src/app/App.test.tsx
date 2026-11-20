import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import { beforeEach, describe, expect, it } from 'vitest'
import LangProvider from '../i18n/LangProvider'
import { slides } from '../content/journey'
import App from './App'

function renderApp(hash = '') {
  window.history.replaceState(null, '', `/${hash}`)
  return render(
    <FluentProvider theme={webDarkTheme}>
      <LangProvider>
        <App />
      </LangProvider>
    </FluentProvider>,
  )
}

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.lang = 'en'
})

describe('App', () => {
  it('opens on the English cover with the professional identity', () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1, name: /AI Apps and Agents Developer/i })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByRole('button', { name: 'Switch language to Korean' })).toBeInTheDocument()
  })

  it('switches the text to Korean and back without reloading', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Switch language to Korean' }))
    expect(document.documentElement.lang).toBe('ko')
    expect(window.localStorage.getItem('ailab-lang')).toBe('ko')
    const toEnglish = screen.getByRole('button', { name: '언어를 English로 전환' })

    await user.click(toEnglish)
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByRole('button', { name: 'Switch language to Korean' })).toBeInTheDocument()
  })

  it('moves through the deck with the buttons, keyboard and hash', async () => {
    const user = userEvent.setup()
    renderApp()
    expect(window.location.hash).toBe('#cover')

    await user.click(screen.getAllByRole('button', { name: 'Next' })[0])
    expect(window.location.hash).toBe('#overview')

    await user.keyboard('{ArrowRight}')
    expect(window.location.hash).toBe('#m1')

    await user.keyboard('{ArrowLeft}')
    expect(window.location.hash).toBe('#overview')

    await user.keyboard('{End}')
    expect(window.location.hash).toBe('#notes')
    for (const next of screen.getAllByRole('button', { name: 'Next' })) expect(next).toBeDisabled()

    await user.keyboard('{Home}')
    expect(window.location.hash).toBe('#cover')
  })

  it('opens the slide named in the URL hash and exposes only that slide', () => {
    renderApp('#m2-s3')
    const active = document.querySelector('.slide.is-active')
    expect(active?.id).toBe('slide-m2-s3')
    expect(document.querySelectorAll('.slide[inert]')).toHaveLength(slides.length - 1)
  })

  it('jumps to a stage from the overview map', async () => {
    const user = userEvent.setup()
    renderApp('#overview')
    const map = document.querySelector('.journey-map') as HTMLElement
    const buttons = within(map).getAllByRole('button')
    await user.click(buttons[2])
    expect(window.location.hash).toMatch(/^#m1-s\d$/)
  })

  it('opens a recorded capture in the lightbox', async () => {
    const user = userEvent.setup()
    renderApp('#m2-s1')
    const active = document.querySelector('.slide.is-active') as HTMLElement
    const capture = within(active).getAllByRole('button', { name: /^Open capture/ })[0]

    await act(async () => {
      await user.click(capture)
    })

    // Fluent marks the surface aria-hidden under jsdom, which has no real modal layer.
    const dialog = await screen.findByRole('dialog', { hidden: true })
    const image = dialog.querySelector('img')
    expect(image?.getAttribute('src')).toMatch(/^\/img\/foundry\/img\d+\.png$/)
    const firstSrc = image?.getAttribute('src')

    await act(async () => {
      await user.keyboard('{ArrowRight}')
    })
    expect(dialog.querySelector('img')?.getAttribute('src')).not.toBe(firstSrc)
    expect(window.location.hash).toBe('#m2-s1')
  })
})
