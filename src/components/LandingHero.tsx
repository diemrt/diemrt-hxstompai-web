import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CarouselPedalboardBlocks from "./CarouselPedalboardBlocks";
import { PresetSuggestions } from "./PresetSuggestions";
import { useState } from "react";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

type Props = {
  onAiResponse: (response: any) => void;
}

export function LandingHero({ onAiResponse }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = async (values: { message: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: values.message }),
      });
      
      if (!response.ok) {
        onAiResponse({
          data: {
            error: "Failed to generate preset",
            pedals: [],
            total_pedals: 0,
            remaining_slots: 0,
            max_chain_size: 0
          },
          initialQuestion: values.message
        });
        return;
      }

      const data = await response.json();
      onAiResponse({ ...data, initialQuestion: values.message });
    } catch (error) {
      console.error("Error:", error);
      onAiResponse({
        data: {
          error: "An unexpected error occurred",
          pedals: [],
          total_pedals: 0,
          remaining_slots: 0,
          max_chain_size: 0
        },
        initialQuestion: values.message
      });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("message", suggestion);
    form.handleSubmit((values) => handleSubmit(values))();
  };

  return (
    <Form {...form}>
      <div className="relative animate-fade-in flex min-h-screen flex-col items-center justify-center px-4">
        <CarouselPedalboardBlocks />
        <div className="flex max-w-5xl flex-col items-center space-y-8 text-center z-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              HX Stomp AI
            </span>
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Transform your guitar experience with AI-powered tone creation. Simply
            describe your desired sound, and let our AI craft the perfect preset.
          </p>

          <PresetSuggestions 
            onSuggestionClick={handleSuggestionClick}
            disabled={isLoading}
          />

          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-2xl space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe your ideal tone...</FormLabel>
                  <FormControl>
                    <textarea
                      className="min-h-[100px] w-full rounded-lg border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      placeholder="e.g., 'warm clean tone with subtle reverb'"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              size="lg" 
              className="animate-scale-up w-full sm:w-auto hover:cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Preset"}
              <BrainCircuit className="ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}