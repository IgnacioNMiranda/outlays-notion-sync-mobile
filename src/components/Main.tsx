import { StyleSheet, Text, StatusBar, Appearance } from 'react-native'
import { useCustomFonts } from '../hooks/use-custom-fonts'
import { Form } from './Form'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Layout } from '@ui-kitten/components'
import { default as mapping } from '../../mapping.json'

const mainStyles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 60,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'Sono',
  },
})
const darkMainStyles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    color: 'white',
  },
})
const lightMainStyles = StyleSheet.create({
  container: {
    backgroundColor: '#8FBAB0',
    color: 'black',
  },
})

const titleStyles = StyleSheet.create({
  container: {
    fontSize: 24,
    paddingBottom: 40,
    fontWeight: '300',
    fontFamily: 'Sono',
  },
})

export const Main = () => {
  const colorScheme = Appearance.getColorScheme()
  //const isDarkTheme = colorScheme === 'dark'
  const isDarkTheme = true

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
      <Layout
        onLayout={onLayoutRootView}
        style={StyleSheet.compose(
          mainStyles.container,
          isDarkTheme ? darkMainStyles.container : lightMainStyles.container,
        )}
        level="1"
      >
        <StatusBar
          barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkTheme ? '#191919' : '#8FBAB0'}
        />
        <Text style={{ ...titleStyles.container, color: isDarkTheme ? 'white' : 'black' }}>Outlays Notion Sync</Text>
        <Form />
      </Layout>
    </ApplicationProvider>
  )
}
