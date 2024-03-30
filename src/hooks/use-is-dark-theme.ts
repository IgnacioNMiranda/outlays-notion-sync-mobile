import { Appearance } from 'react-native'

export const useIsDarkTheme = () => {
  const colorScheme = Appearance.getColorScheme()
  return colorScheme === 'dark'
}
