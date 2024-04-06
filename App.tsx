import { QueryClient, QueryClientProvider } from 'react-query'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import * as eva from '@eva-design/eva'
import { default as theme } from './theme.json' // <-- Import app theme
import { TabNavigator } from './src/components/tab-navigator/tab-navigator'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useIsDarkTheme } from './src/hooks/use-is-dark-theme'

const queryClient = new QueryClient()

export default function App() {
  const isDarkTheme = useIsDarkTheme()
  const evaTheme = isDarkTheme ? eva.dark : eva.light

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...evaTheme, ...theme }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}
