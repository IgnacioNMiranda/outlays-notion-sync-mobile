import { StatusBarStyle, StyleSheet } from 'react-native'

export const useGlobalStyle = () => {
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
      barStyle: 'light-content' as StatusBarStyle,
    },
  }
}
