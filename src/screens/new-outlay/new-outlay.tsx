import { Layout } from '@ui-kitten/components'
import { StatusBar, Text } from 'react-native'
import { useCustomFonts } from '../../hooks/use-custom-fonts'
import { useIsDarkTheme } from '../../hooks/use-is-dark-theme'
import { titleStyles } from './new-outlay.styles'
import { CreateOutlayForm } from '../../components/create-outlay-form/create-outlay-form'
import { useGlobalStyle } from '../../hooks/use-global-style'

export const NewOutlayScreen = () => {
  const { global, statusBar } = useGlobalStyle()
  const isDarkTheme = useIsDarkTheme()

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={global} level="1">
      <StatusBar {...statusBar} />
      <Text style={{ ...titleStyles.container, color: isDarkTheme ? 'white' : 'black' }}>Create New Outlay</Text>
      <CreateOutlayForm />
    </Layout>
  )
}
