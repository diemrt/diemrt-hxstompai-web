import { Dashboard } from "@/components/Dashboard"
import { LandingHero } from "@/components/LandingHero"
import { useState } from "react"

type AIResponse = {
  data: {
    pedals: Array<{
      name: string
      category: string
      subcategory: string
      params: Array<Record<string, string>>
      position: number
    }>
    total_pedals: number
    remaining_slots: number
    max_chain_size: number
    recipes: string[]
  }
}

const Index = () => {
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)

  return aiResponse ? (
    <Dashboard aiResponse={aiResponse} />
  ) : (
    <LandingHero onAiResponse={setAiResponse} />
  )
}

export default Index