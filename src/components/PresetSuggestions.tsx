import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";

type PresetSuggestionsProps = {
    onSuggestionClick: (suggestion: string) => void;
    disabled?: boolean;
};

const suggestions = [
    "Create Blues tone with tube screamer and spring reverb",
    "Create an ambient clean tone with shimmer reverb to play post-rock",
    "Generate a Worship Tone for Contemporary Christian Music solo guitar",
];

export function PresetSuggestions({ onSuggestionClick, disabled }: PresetSuggestionsProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onSuggestionClick(suggestion)}
                    disabled={disabled}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <LightbulbIcon className="mr-2 h-4 w-4" />
                    {suggestion}
                </Button>
            ))}
        </div>
    );
}