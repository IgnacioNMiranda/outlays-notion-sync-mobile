import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getOutlays } from '../../services/notion/get-outlays'
import { Alert } from 'react-native'

export const OUTLAYS_QUERY_KEY = 'outlays'

export const useOutlays = () => {
  const { data: outlays, isError: outlaysError, isLoading: outlaysLoading } = useQuery(OUTLAYS_QUERY_KEY, getOutlays)

  useEffect(() => {
    if (outlaysError) Alert.alert(`Error fetching Outlay Entries`)
  }, [outlaysError])

  return { outlays, outlaysError, outlaysLoading }
}
