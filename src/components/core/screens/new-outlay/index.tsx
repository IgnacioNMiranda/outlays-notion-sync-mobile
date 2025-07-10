import { Layout } from '@ui-kitten/components'
import { Platform, ScrollView, StatusBar } from 'react-native'
import { useCustomFonts } from '../../../../hooks/utils/use-custom-fonts'
import { useGlobalStyle } from '../../../../hooks/utils/use-global-style'
import { CreateOutlayForm } from '../../../forms/create-outlay-form'
import { CustomText } from '../../../custom-text'

export const NewOutlayScreen = () => {
  const { global, statusBar } = useGlobalStyle()

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={global} level="1">
      <StatusBar {...statusBar} />
      <CustomText
        label="Create New Outlay"
        size="big"
        fontWeight="300"
        marginBottom={40}
        marginTop={Platform.OS === 'ios' ? 30 : 0}
      />
      <ScrollView style={{ width: '80%' }}>
        <CreateOutlayForm />
      </ScrollView>
    </Layout>
  )
}
