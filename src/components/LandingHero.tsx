import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SendHorizontal } from "lucide-react"

export function LandingHero() {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitted:", message)
    setMessage("")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="flex max-w-5xl flex-col items-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            HX Stomp AI
          </span>
        </h1>
        
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Transform your guitar experience with AI-powered tone creation. 
          Simply describe your desired sound, and let our AI craft the perfect preset.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your ideal tone... (e.g., 'warm clean tone with subtle reverb')"
            className="min-h-[100px] w-full rounded-lg border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Generate Preset
            <SendHorizontal className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  )
}
