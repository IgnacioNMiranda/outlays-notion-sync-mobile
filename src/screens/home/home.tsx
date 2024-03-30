import { Layout } from '@ui-kitten/components'
import { StatusBar, Text } from 'react-native'
import { titleStyles } from '../new-outlay/new-outlay.styles'
import { useCustomFonts } from '../../hooks/use-custom-fonts'
import { useGlobalStyle } from '../../hooks/use-global-style'
import { useIsDarkTheme } from '../../hooks/use-is-dark-theme'
import { formatCurrency } from '../../utils/formatters'
import { getSpentMoney } from '../../services/notion/get-spent-money'
import { useQuery } from 'react-query'
import { BASE_MONEY_VALUE } from '@env'

export const HomeScreen = () => {
  const { global, statusBar } = useGlobalStyle()
  const isDarkTheme = useIsDarkTheme()

  const { data } = useQuery('spent-money', getSpentMoney)

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={global} level="1">
      <StatusBar {...statusBar} />
      <Text style={{ ...titleStyles.container, paddingBottom: 10, color: isDarkTheme ? 'white' : 'black' }}>
        Remaining
      </Text>
      <Text style={{ ...titleStyles.container, color: isDarkTheme ? 'white' : 'black' }}>
        {formatCurrency(Number(BASE_MONEY_VALUE ?? 0) - data)}
      </Text>
    </Layout>
  )
}
