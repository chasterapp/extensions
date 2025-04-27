import { LayoutEntrypoint } from '@/modules/keyholder-ai/components/layout/LayoutEntrypoint'
import { SuspenseErrorBoundary } from '@/modules/ui/components/layouts/SuspenseErrorBoundary'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <SuspenseErrorBoundary>
      <LayoutEntrypoint>{children}</LayoutEntrypoint>
    </SuspenseErrorBoundary>
  )
}
