import { Layout, Spinner } from '@ui-kitten/components'
import { StatusBar, View } from 'react-native'
import { useOutlays } from '../../../../hooks/data/use-outlays'
import { useSpentMoney } from '../../../../hooks/data/use-spent-money'
import { useCustomFonts } from '../../../../hooks/utils/use-custom-fonts'
import { useGlobalStyle } from '../../../../hooks/utils/use-global-style'
import { OutlaysList } from '../../../outlays-list/outlays-list'
import { Text } from '../../../text'

export const MyOutlaysScreen = () => {
  const { global, statusBar } = useGlobalStyle()

  const { spentMoneyError, spentMoneyLoading, formattedMoney, moneyStatus } = useSpentMoney()
  const { outlays, outlaysError, outlaysLoading } = useOutlays()

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={[global]} level="1">
      <StatusBar {...statusBar} />
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 20,
        }}
      >
        <Text size="big" label="Remaining Money" />
        {(spentMoneyLoading || outlaysLoading) && <Spinner status="primary" size="medium" />}
        {!spentMoneyLoading && !spentMoneyError && (
          <Text size="bigger" fontWeight="bold" status={moneyStatus} label={formattedMoney} />
        )}
        {!outlaysLoading && !outlaysError && outlays && <OutlaysList outlays={outlays} />}
      </View>
    </Layout>
  )
}
