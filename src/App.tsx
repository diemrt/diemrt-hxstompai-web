import { ThemeProvider } from "@/components/ThemeProvider"
import Index from "./pages/Index"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Index />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
