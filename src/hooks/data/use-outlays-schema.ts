import { useQuery } from 'react-query'
import { getSchema } from '../../services/notion/get-schema'

export const useOutlaySchema = (): {
  availableTags?: string[]
  availablePaymentMethods?: string[]
} => {
  const { data } = useQuery('data', getSchema)

  return {
    availableTags: data?.tags,
    availablePaymentMethods: data?.paymentMethods,
  }
}
