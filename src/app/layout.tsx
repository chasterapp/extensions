import { getLanguage } from '@/app/i18n/get-language'
import Shell from '@/app/Shell'
import { Providers } from './Providers'
import MuiThemeProvider from '@/modules/ui/contexts/MuiThemeProvider'
import type { Metadata } from 'next'
import '@fontsource/nunito'
import '@/lib/dayjs'
import './layout.css'
import { SuspenseErrorBoundary } from '@/modules/ui/components/layouts/SuspenseErrorBoundary'

export const metadata: Metadata = {
  title: 'Chaster',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lng = getLanguage()

  return (
    <html lang={lng}>
      <body>
        <MuiThemeProvider options={{ key: 'joy' }}>
          <SuspenseErrorBoundary>
            <Providers>
              <Shell>{children}</Shell>
            </Providers>
          </SuspenseErrorBoundary>
        </MuiThemeProvider>
      </body>
    </html>
  )
}
