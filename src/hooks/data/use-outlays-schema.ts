import { useQuery } from 'react-query'
import { getSchema } from '../../services/notion/get-schema'

export const useOutlaySchema = () => {
  const { data } = useQuery('data', getSchema)

  return { availableTags: data?.tags, availablePaymentMethods: data?.paymentMethods }
}
