import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
