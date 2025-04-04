import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PedalboardBlock from "./PedalboardBlock";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Link2, SendHorizonal } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";

const chatFormSchema = z.object({
    message: z.string().min(2, {
        message: "Message must be at least 2 characters.",
    }),
});

type AIResponse = {
    data: {
        pedals: Array<{
            name: string;
            category: string;
            subcategory: string;
            params: Array<Record<string, string>>;
            position: number;
        }>;
        total_pedals: number;
        remaining_slots: number;
        max_chain_size: number;
        recipes: string[];
    };
};

type ChatMessage = {
    type: "bot" | "user";
    message: string;
};

type Props = {
    aiResponse: AIResponse & { initialQuestion?: string };
};

export function Dashboard({ aiResponse }: Props) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentAiResponse, setCurrentAiResponse] = useState<AIResponse>(aiResponse);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        resolver: zodResolver(chatFormSchema),
        defaultValues: {
            message: "",
        },
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Initialize messages with the initial question if it exists
        const initialMessages: ChatMessage[] = [];
        if (aiResponse.initialQuestion) {
            initialMessages.push({
                type: "user" as const,
                message: aiResponse.initialQuestion
            });
        }
        initialMessages.push(...aiResponse.data.recipes.map((recipe: string) => ({
            type: "bot" as const,
            message: recipe
        })));
        setMessages(initialMessages);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (values: { message: string }) => {
        try {
            // Add user message to chat
            setMessages(prev => [...prev, { type: "user" as const, message: values.message }]);
            
            // Make API call
            const response = await fetch("http://localhost:8000/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: values.message }),
            });
            
            if (!response.ok) {
                throw new Error("Failed to get AI response");
            }

            const data = await response.json();
            
            // Update AI response and add bot messages
            setCurrentAiResponse(data);
            setMessages(prev => [
                ...prev,
                ...data.data.recipes.map((recipe: string) => ({
                    type: "bot" as const,
                    message: recipe
                }))
            ]);

            form.reset();
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { 
                type: "bot" as const, 
                message: "Sorry, I encountered an error processing your request." 
            }]);
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 gap-4 bg-background">
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
                <Card className="flex-[2] animate-slide-in-left min-w-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Link2 className="h-5 w-5" />
                            Pedalboard Chain ({currentAiResponse.data.total_pedals} pedals)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                        <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-4 px-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                            {currentAiResponse.data.pedals.map((pedal, index) => (
                                <PedalboardBlock
                                    key={index}
                                    category={pedal.category}
                                    name={pedal.name}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 animate-scale-up flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BrainCircuit className="h-5 w-5" />
                            AI Assistant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                            msg.type === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        }`}
                                    >
                                        <p className="text-sm">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

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
                                                    placeholder="Ask a follow-up question..."
                                                    {...field}
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