
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Activity, Merge, Split } from "lucide-react";

interface PedalboardBlockProps {
    category: string;
    name: string;
}

const PedalboardBlock = ({
    category,
    name,
}: PedalboardBlockProps) => {
    return (
        <Card className="w-52 h-52 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
            <CardHeader className="flex justify-start items-center gap-3">
                <Activity className="h-4 w-4 text-primary" />
                <CardDescription className="text-xs font-bold">{category}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
                <span className="text-md text-start font-semibold text-primary">
                    {name}
                </span>
                <div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Merge className="h-3 w-3" />
                            <span>Mono</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Split className="h-3 w-3" />
                            <span>Stereo</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PedalboardBlock;