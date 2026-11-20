import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import App from './app/App'
import LangProvider from './i18n/LangProvider'
import './app/styles.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container #root was not found in the document.')
}

createRoot(container).render(
  <StrictMode>
    <FluentProvider theme={webDarkTheme} className="fluent-root">
      <LangProvider>
        <App />
      </LangProvider>
    </FluentProvider>
  </StrictMode>,
)
