import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import idID from 'antd/locale/id_ID'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import { useTranslation } from 'react-i18next'
import './i18n'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.tsx'
import type { LanguageCode } from './i18n'

const antdLocales = {
  id: idID,
  en: enUS,
  'zh-CN': zhCN
}

function AppProviders() {
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'id') as LanguageCode

  useEffect(() => {
    dayjs.locale(language === 'zh-CN' ? 'zh-cn' : language)
    document.documentElement.lang = language
  }, [language])

  return (
    <ConfigProvider
      locale={antdLocales[language] || idID}
      theme={{
        token: {
          colorPrimary: '#4D8088',
          colorBgBase: '#F8F6F1',
          colorTextBase: '#2B2B2B',
          borderRadius: 6,
          wireframe: false,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        },
        components: {
          Layout: {
            bodyBg: '#F8F6F1',
            headerBg: '#FFFFFF',
            siderBg: '#FFFFFF',
          },
          Card: {
            colorBgContainer: '#FFFFFF',
            boxShadowTertiary: '0 4px 12px rgba(0, 0, 0, 0.05)',
          },
          Button: {
            borderRadius: 6,
            controlHeight: 36,
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
