import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import 'antd/dist/reset.css'
import './index.css'
import AppProviders from './components/AppProviders'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
