import { StatusBarStyle, StyleSheet } from 'react-native'
import { useIsDarkTheme } from './use-is-dark-theme'

export const mainStyles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 60,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'Sono',
  },
})

export const darkMainStyles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    color: 'white',
  },
})

export const lightMainStyles = StyleSheet.create({
  container: {
    backgroundColor: '#8FBAB0',
    color: 'black',
  },
})

export const useGlobalStyle = () => {
  const isDarkTheme = useIsDarkTheme()

  return {
    global: StyleSheet.compose(
      mainStyles.container,
      isDarkTheme ? darkMainStyles.container : lightMainStyles.container,
    ),
    statusBar: {
      barStyle: (isDarkTheme ? 'light-content' : 'dark-content') as StatusBarStyle,
      backgroundColor: isDarkTheme ? '#191919' : '#8FBAB0',
    },
  }
}
