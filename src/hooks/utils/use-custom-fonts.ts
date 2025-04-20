import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Sono: require('../../../assets/fonts/Sono/Sono-Medium.ttf'),
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  return { fontsLoaded, onLayoutRootView }
}
