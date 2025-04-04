import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PedalboardBlock from "./PedalboardBlock";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Link2, Send, SendHorizonal } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const chatFormSchema = z.object({
    message: z.string().min(2, {
        message: "Message must be at least 2 characters.",
    }),
});

export function Dashboard() {
    const form = useForm({
        resolver: zodResolver(chatFormSchema),
        defaultValues: {
            message: "",
        },
    });

    const handleSubmit = (values: any) => {
        console.log("Submitted:", values.message);
        form.reset();
    };

    // Mock data for pedalboard chain
    const mockPedals = [
        { category: "Amp", name: "US Double Nrm" },
        { category: "Delay", name: "Vintage Digital" },
        { category: "Reverb", name: "Glitz" },
    ];

    // Mock chat messages
    const mockChat = [
        { type: "bot", message: "Hi! I can help you create the perfect tone." },
        { type: "user", message: "I need a clean tone with delay" },
        { type: "bot", message: "I've set up a clean amp with vintage delay." },
    ];

    return (
        <div className="flex flex-col h-screen p-4 gap-4 bg-background">
            {/* Title Card */}
            <Card className="w-full animate-fade-in">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tighter">
                        <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                            HX Stomp AI
                        </span>
                    </CardTitle>
                </CardHeader>
            </Card>

            <div className="flex gap-4 flex-1">
                {/* Pedalboard Chain (80% width) */}
                <Card className="flex-[4] animate-slide-in-left">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Link2 className="h-5 w-5" />
                            Pedalboard Chain
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 overflow-x-auto p-4">
                            {mockPedals.map((pedal, index) => (
                                <PedalboardBlock
                                    key={index}
                                    category={pedal.category}
                                    name={pedal.name}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Chatbot (20% width) */}
                <Card className="flex-1 animate-scale-up flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BrainCircuit className="h-5 w-5" />
                            AI Assistant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        {/* Chat messages */}
                        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                            {mockChat.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.type === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat input */}
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="w-full max-w-2xl space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
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
                                    Ask AI
                                    <SendHorizonal className="ml-2" />
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}