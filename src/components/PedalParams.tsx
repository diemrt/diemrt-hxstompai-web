import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";
import { useState } from "react";

type ParamKnobProps = {
    name: string;
    value: string;
};

const ParamKnob = ({ name, value }: ParamKnobProps) => {
    const getKnobRotation = (value: string) => {
        const percentage = parseInt(value, 10) || 50;
        const degrees = (percentage / 100) * 270 - 135; // -135 to +135 degrees
        return degrees;
    };

    const rotation = getKnobRotation(value);

    return (
        <div className="flex flex-col items-center group">
            <div className="knob mb-3 relative w-20 h-20 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-lg border border-zinc-800 transition-all duration-200 hover:scale-105">
                {/* Outer ring with gradient */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                
                {/* Inner ring with subtle highlight */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950">
                    {/* Indicator line */}
                    <div 
                        className="knob-indicator absolute w-0.5 h-7 bg-gradient-to-b from-primary to-primary/70 top-1.5 left-1/2 origin-bottom rounded-full transition-transform duration-200"
                        style={{ 
                            transform: `rotate(${rotation}deg)`
                        }}
                    >
                        {/* Indicator dot */}
                        <div className="absolute -top-0.5 -left-[3px] w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                    </div>
                </div>
            </div>
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