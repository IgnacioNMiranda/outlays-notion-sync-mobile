import { Layout } from '@ui-kitten/components'
import { StatusBar, View } from 'react-native'
import { useCustomFonts } from '../../../../hooks/utils/use-custom-fonts'
import { useGlobalStyle } from '../../../../hooks/utils/use-global-style'
import { CreateOutlayForm } from '../../../forms/create-outlay-form'
import { Text } from '../../../text'

export const NewOutlayScreen = () => {
  const { global, statusBar } = useGlobalStyle()

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={global} level="1">
      <StatusBar {...statusBar} />
      <View style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '80%', alignItems: 'center' }}>
        <Text label="Create New Outlay" size="big" fontWeight="300" />
        <CreateOutlayForm />
      </View>
    </Layout>
  )
}
