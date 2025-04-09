import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

type ParamKnobProps = {
    name: string;
    value: string;
};

const ParamKnob = ({ name, value }: ParamKnobProps) => {
    return (
        <div className="animate-fade-in flex flex-col items-center group">
            
            <p className="text-sm font-medium tracking-tight group-hover:text-primary transition-colors">{name}</p>
            <p className="text-xs text-muted-foreground font-mono">{value}</p>
        </div>
    );
};

type PedalParamsProps = {
    name: string;
    category: string;
    params: Array<Record<string, string>>;
};

export const PedalParams = ({ name, category, params }: PedalParamsProps) => {
    return (
        <Card className="w-full animate-slide-in-bottom">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Circle className="h-3 w-3 fill-primary text-primary" />
                    <CardTitle className="text-lg">{name}</CardTitle>
                </div>
                <CardDescription>{category}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-8 justify-start">
                    {params.map((param, index) => {
                        const [name, value] = Object.entries(param)[0];
                        return (
                            <ParamKnob 
                                key={index}
                                name={name}
                                value={value}
                            />
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};