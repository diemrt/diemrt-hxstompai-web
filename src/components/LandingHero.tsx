import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming you're using the provided UI components

// Define your form schema
const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

export function LandingHero() {
  // Initialize the form with useForm
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "", // Initialize with an empty message
    },
  });

  const handleSubmit = (values: any) => {
    // values will be type-safe and validated according to your formSchema
    console.log("Submitted:", values.message);
    form.reset(); // Clear the form after submission
  };

  return (
    <Form {...form}>
      <div className="animate-fade-in flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
        <div className="flex max-w-5xl flex-col items-center space-y-8 text-center">
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
                      {...field} // Spread the field properties here
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="animate-scale-up w-full sm:w-auto hover:cursor-pointer">
              Generate Preset
              <SendHorizontal className="ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
}