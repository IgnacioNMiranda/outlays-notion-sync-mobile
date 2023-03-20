import { View, StyleSheet, Text, StatusBar, Appearance } from 'react-native'
import { Form } from './Form'

StatusBar.setBarStyle('light-content')

const mainStyles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 60,
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    fontSize: 32,
    paddingBottom: 40,
  },
})

export const Main = () => {
  const colorScheme = Appearance.getColorScheme()
  return (
    <View
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
