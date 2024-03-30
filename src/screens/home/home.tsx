import { Layout } from '@ui-kitten/components'
import { StatusBar, View } from 'react-native'
import { useCustomFonts } from '../../hooks/use-custom-fonts'
import { useGlobalStyle } from '../../hooks/use-global-style'
import { useIsDarkTheme } from '../../hooks/use-is-dark-theme'
import { formatCurrency } from '../../utils/formatters'
import { Text } from '../../components/text/text'
import { getSpentMoney } from '../../services/notion/get-spent-money'
import { useQuery } from 'react-query'
import { BASE_MONEY_VALUE } from '@env'
import { Spinner } from '../../components/spinner/spinner'

export const HomeScreen = () => {
  const { global, statusBar } = useGlobalStyle()
  const isDarkTheme = useIsDarkTheme()

  const { data: spentMoney = 0, isLoading } = useQuery('spent-money', getSpentMoney)

  const remainingMoney = Number(BASE_MONEY_VALUE ?? 0) - spentMoney

  const getRemainingMoneyStyle = () => {
    if (typeof BASE_MONEY_VALUE !== 'undefined') {
      const baseMoneyNumber = Number(BASE_MONEY_VALUE)
      if (remainingMoney <= baseMoneyNumber * 0.2) return 'red'
      if (remainingMoney <= baseMoneyNumber * 0.5) return 'yellow'
    }
    return isDarkTheme ? 'white' : 'black'
  }

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={global} level="1">
      <StatusBar {...statusBar} />
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Text size="big" label="Remaining" />
        {isLoading ? (
          <View style={{ display: 'flex', gap: 8, flexDirection: 'row', alignItems: 'center' }}>
            <Spinner />
            <Spinner />
            <Spinner />
          </View>
        ) : (
          <Text
            size="bigger"
            fontWeight="700"
            color={getRemainingMoneyStyle()}
            label={formatCurrency(remainingMoney)}
          />
        )}
      </View>
    </Layout>
  )
}
