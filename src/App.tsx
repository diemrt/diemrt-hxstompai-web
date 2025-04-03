import { ThemeProvider } from "@/components/ThemeProvider"
import Index from "./pages/Index"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Index />
    </ThemeProvider>
  )
}

export default App
