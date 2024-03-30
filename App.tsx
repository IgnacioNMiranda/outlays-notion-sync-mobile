import { QueryClient, QueryClientProvider } from 'react-query'
import { mapping } from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import * as eva from '@eva-design/eva'
import { TabNavigator } from './src/components/tab-navigator/tab-navigator'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}
