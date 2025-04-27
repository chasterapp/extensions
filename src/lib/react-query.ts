import { isServer, QueryClient } from '@tanstack/react-query'

function buildQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  })
}

let queryClient: QueryClient | undefined

export function getQueryClient() {
  if (isServer) {
    return buildQueryClient()
  }

  if (!queryClient) queryClient = buildQueryClient()
  return queryClient
}
