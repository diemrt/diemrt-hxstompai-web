import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";
import { useState } from "react";

type ParamKnobProps = {
    name: string;
    value: string;
};

const ParamKnob = ({ name, value }: ParamKnobProps) => {
    const numericValue = parseInt(value.replace('%', ''));
    const [rotation, setRotation] = useState(numericValue * 3.6);

    return (
        <div className="flex flex-col items-center">
            <div className="knob mb-3 relative w-16 h-16 rounded-full bg-[#1c1c1c] border-2 border-[#2a2a2a]">
                <div 
                    className="knob-indicator absolute w-0.5 h-6 bg-primary top-1.5 left-1/2 origin-bottom rounded-full"
                    style={{ 
                        transform: `rotate(${rotation}deg)`
                    }}
                />
            </div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{value}</p>
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