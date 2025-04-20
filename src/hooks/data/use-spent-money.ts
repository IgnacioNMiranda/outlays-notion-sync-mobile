import { BASE_MONEY_VALUE } from '@env'
import { useEffect, useMemo } from 'react'
import { Alert } from 'react-native'
import { useQuery } from 'react-query'
import { getSpentMoney } from '../../services/notion/get-spent-money'
import { formatCurrency } from '../../utils/formatters'

export const SPENT_MONEY_QUERY_KEY = 'spent-money'

export const useSpentMoney = () => {
  const { data: spentMoney = 0, isError, isLoading } = useQuery(SPENT_MONEY_QUERY_KEY, getSpentMoney)

  useEffect(() => {
    if (isError) Alert.alert(`Error fetching Spent Money`)
  }, [isError])

  const remainingMoney = Number(BASE_MONEY_VALUE ?? 0) - spentMoney

  const remainingMoneyStatus = useMemo(() => {
    if (typeof BASE_MONEY_VALUE !== 'undefined') {
      const baseMoneyNumber = Number(BASE_MONEY_VALUE)
      if (remainingMoney <= baseMoneyNumber * 0.2) return 'danger'
      if (remainingMoney <= baseMoneyNumber * 0.5) return 'warning'
    }
    return 'basic'
  }, [remainingMoney])

  return {
    spentMoneyError: isError,
    spentMoneyLoading: isLoading,
    moneyStatus: remainingMoneyStatus,
    formattedMoney: formatCurrency(remainingMoney),
  }
}
