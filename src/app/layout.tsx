import MuiThemeProvider from '@/modules/ui/contexts/MuiThemeProvider'
import '@fontsource/nunito'
import type { Metadata } from 'next'
import './layout.css'
import { getLanguage } from '@/app/i18n/get-language'
import Shell from '@/app/Shell'

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
          <Shell>{children}</Shell>
        </MuiThemeProvider>
      </body>
    </html>
  )
}
