import { useQueryClient } from 'react-query'
import { OUTLAYS_QUERY_KEY } from './use-outlays'
import { SPENT_MONEY_QUERY_KEY } from './use-spent-money'

export const useInvalidateData = () => {
  const queryClient = useQueryClient()

  const invalidateOutlays = () =>
    queryClient.invalidateQueries({
      queryKey: [OUTLAYS_QUERY_KEY],
      refetchActive: true,
      refetchInactive: true,
    })

  const invalidateSpentMoney = () =>
    queryClient.invalidateQueries({
      queryKey: [SPENT_MONEY_QUERY_KEY],
      refetchActive: true,
      refetchInactive: true,
    })

  return { invalidateOutlays, invalidateSpentMoney }
}
