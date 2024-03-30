import { Layout } from '@ui-kitten/components'
import { StatusBar, Text } from 'react-native'
import { titleStyles } from '../new-outlay/new-outlay.styles'
import { useCustomFonts } from '../../hooks/use-custom-fonts'
import { useGlobalStyle } from '../../hooks/use-global-style'
import { useIsDarkTheme } from '../../hooks/use-is-dark-theme'

export const HomeScreen = () => {
  const { global, statusBar } = useGlobalStyle()
  const isDarkTheme = useIsDarkTheme()

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <Layout onLayout={onLayoutRootView} style={global} level="1">
      <StatusBar {...statusBar} />
      <Text style={{ ...titleStyles.container, color: isDarkTheme ? 'white' : 'black' }}>Home</Text>
    </Layout>
  )
}
