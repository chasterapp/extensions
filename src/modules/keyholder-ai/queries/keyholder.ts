import { useQuery } from '@tanstack/react-query'
import { getKeyholders } from '../actions/keyholders'

export function useKeyholders() {
  return useQuery({
    queryKey: ['keyholders'],
    queryFn: () => getKeyholders(),
  })
}
