import { Layout } from '@ui-kitten/components'
import { StatusBar, View } from 'react-native'
import { useCustomFonts } from '../../hooks/use-custom-fonts'
import { useGlobalStyle } from '../../hooks/use-global-style'
import { formatCurrency } from '../../utils/formatters'
import { Text } from '../../components/text/text'
import { getSpentMoney } from '../../services/notion/get-spent-money'
import { useQuery } from 'react-query'
import { BASE_MONEY_VALUE } from '@env'
import { Spinner } from '../../components/spinner/spinner'
import { getOutlayEntries } from '../../services/notion/get-outlay-entries'
import { OutlaysList } from '../../components/outlays-list/outlays-list'

export const HomeScreen = () => {
  const { global, statusBar } = useGlobalStyle()

  const {
    data: spentMoney = 0,
    isError: spentMoneyError,
    isLoading: spentMoneyLoading,
  } = useQuery('spent-money', getSpentMoney)

  const {
    data: outlayEntries,
    isError: outlayEntriesError,
    isLoading: outlayEntriesLoading,
  } = useQuery('outlay-entries', getOutlayEntries)

  const remainingMoney = Number(BASE_MONEY_VALUE ?? 0) - spentMoney

  const getRemainingMoneyStatus = () => {
    if (typeof BASE_MONEY_VALUE !== 'undefined') {
      const baseMoneyNumber = Number(BASE_MONEY_VALUE)
      if (remainingMoney <= baseMoneyNumber * 0.2) return 'danger'
      if (remainingMoney <= baseMoneyNumber * 0.5) return 'warning'
    }
    return 'basic'
  }

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={[global]} level="1">
      <StatusBar {...statusBar} />
      <View style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Text size="big" label="Remaining Money" />
        {(spentMoneyLoading || outlayEntriesLoading) && <Spinner status="primary" size="medium" />}
        {!spentMoneyLoading && !spentMoneyError && (
          <Text
            size="bigger"
            fontWeight="bold"
            status={getRemainingMoneyStatus()}
            label={formatCurrency(remainingMoney)}
          />
        )}
        {!outlayEntriesLoading && !outlayEntriesError && outlayEntries && <OutlaysList outlays={outlayEntries} />}
      </View>
    </Layout>
  )
}
