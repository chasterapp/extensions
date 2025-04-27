import { LayoutEntrypoint } from '@/modules/extensions/components/sessions/layout/LayoutEntrypoint'
import { SuspenseErrorBoundary } from '@/modules/ui/components/layouts/SuspenseErrorBoundary'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ token: string }>
}

export default async function Layout({ children, params }: Props) {
  const { token } = await params

  return (
    <SuspenseErrorBoundary>
      <LayoutEntrypoint token={token}>{children}</LayoutEntrypoint>
    </SuspenseErrorBoundary>
  )
}
