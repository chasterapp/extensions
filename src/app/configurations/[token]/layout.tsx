import ConfigurationLayout from '@/modules/ui/components/layouts/ConfigurationLayout'
import './layout.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ConfigurationLayout>{children}</ConfigurationLayout>
}
