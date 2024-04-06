import { StatusBarStyle, StyleSheet } from 'react-native'
import { useIsDarkTheme } from './use-is-dark-theme'

export const useGlobalStyle = () => {
  const isDarkTheme = useIsDarkTheme()
  return {
    global: StyleSheet.compose(
      {
        display: 'flex',
        paddingVertical: 60,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Sono',
      },
      {},
    ),
    statusBar: {
      barStyle: (isDarkTheme ? 'light-content ' : 'dark-content') as StatusBarStyle,
    },
  }
}
