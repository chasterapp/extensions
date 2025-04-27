'use client'

import type { ReactNode } from 'react'
import { Suspense } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { ErrorBoundary } from 'react-error-boundary'
import LoaderLayout from './LoaderLayout'
import ErrorLayout from './ErrorLayout'

type Props = {
  children: ReactNode
  fallback?: ReactNode
  fallbackRender?: (props: FallbackProps) => ReactNode
}

export function SuspenseErrorBoundary({
  children,
  fallback,
  fallbackRender,
}: Props) {
  return (
    <ErrorBoundary
      fallbackRender={
        fallbackRender ??
        (({ error }: { error: unknown }) => <ErrorLayout error={error} />)
      }
    >
      <Suspense fallback={fallback ?? <LoaderLayout />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
