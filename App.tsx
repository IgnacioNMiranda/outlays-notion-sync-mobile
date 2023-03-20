import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from './src/components/Main'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}
