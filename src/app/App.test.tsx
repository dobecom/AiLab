import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import App from './App'
import { navigation, site } from '../content/site'
import { learningModules } from '../content/modules'

const renderApp = () =>
  render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>,
  )

describe('App', () => {
  it('leads with the professional identity, not an exam dashboard', () => {
    renderApp()

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(site.role)
    expect(screen.getByText(site.tagline)).toBeInTheDocument()
  })

  it('renders the required public sections in order', () => {
    renderApp()

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent)

    expect(headings).toHaveLength(navigation.length)
    expect(headings[0]).toContain('What this lab is built to do well')
    expect(headings[1]).toContain('Theory, then a Foundry build, then evidence')
    expect(headings[2]).toContain('Run the models and agents yourself')
    expect(headings[3]).toContain('From a first experiment to an organisational capability')
    expect(headings[4]).toContain('A portfolio that grows by being used')
  })

  it('exposes keyboard-reachable navigation and a skip link', () => {
    renderApp()

    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main',
    )

    const nav = screen.getByRole('navigation', { name: 'Sections' })
    for (const item of navigation) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        `#${item.id}`,
      )
    }
  })

  it('uses landmarks that assistive technology can navigate', () => {
    renderApp()

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    for (const item of navigation) {
      expect(document.getElementById(item.id)).not.toBeNull()
    }
  })

  it('labels every unfinished item instead of implying a live result', () => {
    renderApp()

    const statusTags = screen.getAllByText(/^(Planned|Building|Published)$/)
    expect(statusTags.length).toBeGreaterThanOrEqual(learningModules.length * 3)
    expect(screen.queryAllByText('Published')).toHaveLength(0)
  })

  it('does not reveal private exam context', () => {
    renderApp()

    const text = document.body.textContent ?? ''
    for (const term of ['580', '520', 'countdown', 'AI-103']) {
      expect(text.toLowerCase()).not.toContain(term.toLowerCase())
    }
  })
})
