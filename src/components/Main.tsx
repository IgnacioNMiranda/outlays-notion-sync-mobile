import { View, StyleSheet, Text, StatusBar, Appearance } from 'react-native'
import { useCustomFonts } from '../hooks/use-custom-fonts'
import { Form } from './Form'

StatusBar.setBarStyle('light-content')

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

  const { fontsLoaded, onLayoutRootView } = useCustomFonts()
  if (!fontsLoaded) return null

  return (
    <View
      onLayout={onLayoutRootView}
      style={StyleSheet.compose(
        mainStyles.container,
        colorScheme === 'dark' ? darkMainStyles.container : lightMainStyles.container,
      )}
    >
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={'green'} />
      <Text style={titleStyles.container}>Outlays Sync</Text>
      <Form />
    </View>
  )
}
