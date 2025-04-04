
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { AvailableCategories } from "@/utils";
import { Activity, ArrowLeftRight, AudioWaveform, BlendIcon, BoomBox, Box, ChartNoAxesColumnDecreasing, Circle, FileAudio, Hourglass, Infinity, KeyboardMusic, Megaphone, RadioReceiver, SlidersVertical, Speaker, Spline, Volume } from "lucide-react";

interface PedalboardBlockProps {
    category: string;
    name: string;
}

const getCategoryIcon = (category: AvailableCategories) => {
    switch (category) {
        case "Distortion":
            return <Activity className="h-4 w-4 text-primary" />;
        case "Dynamics":
            return <Spline className="h-4 w-4 text-primary" />;
        case "EQ":
            return <SlidersVertical className="h-4 w-4 text-primary" />;
        case "Modulation":
            return <AudioWaveform className="h-4 w-4 text-primary" />;
        case "Delay":
            return <Hourglass className="h-4 w-4 text-primary" />;
        case "Reverb":
            return <Box className="h-4 w-4 text-primary" />;
        case "Pitch/Synth":
            return <KeyboardMusic className="h-4 w-4 text-primary" />;
        case "Filter":
            return <ChartNoAxesColumnDecreasing className="h-4 w-4 text-primary" />;
        case "Wah":
            return <Megaphone className="h-4 w-4 text-primary" />;
        case "Amp":
            return <BoomBox className="h-4 w-4 text-primary" />;
        case "Preamp":
            return <RadioReceiver className="h-4 w-4 text-primary" />;
        case "Cab":
            return <Speaker className="h-4 w-4 text-primary" />;
        case "IR":
            return <FileAudio className="h-4 w-4 text-primary" />;
        case "Volume/Pan":
            return <Volume className="h-4 w-4 text-primary" />;
        case "Send/Return":
            return <ArrowLeftRight className="h-4 w-4 text-primary" />;
        case "Looper":
            return <Infinity className="h-4 w-4 text-primary" />;
        default:
            return null;
    }
}

const getCategoryBgColor = (category: AvailableCategories) => {
    switch (category) {
        case "Distortion":
            return "bg-red-500 dark:bg-red-700";
        case "Dynamics":
            return "bg-green-500 dark:bg-green-700";
        case "EQ":
            return "bg-blue-500 dark:bg-blue-700";
        case "Modulation":
            return "bg-purple-500 dark:bg-purple-700";
        case "Delay":
            return "bg-yellow-500 dark:bg-yellow-700";
        case "Reverb":
            return "bg-pink-500 dark:bg-pink-700";
        case "Pitch/Synth":
            return "bg-orange-500 dark:bg-orange-700";
        case "Filter":
            return "bg-teal-500 dark:bg-teal-700";
        case "Wah":
            return "bg-indigo-500 dark:bg-indigo-700";
        case "Amp":
            return "bg-gray-500 dark:bg-gray-700";
        case "Preamp":
            return "bg-lime-500 dark:bg-lime-700";
        case "Cab":
            return "bg-cyan-500 dark:bg-cyan-700";
        case "IR":
            return "bg-slate-500 dark:bg-slate-700";
        case "Volume/Pan":
            return "bg-violet-500 dark:bg-violet-700";
        case "Send/Return":
            return "bg-rose-500 dark:bg-rose-700";
        case "Looper":
            return "bg-fuchsia-500 dark:bg-fuchsia-700";
        default:
            return null;
    }
}

const PedalboardBlock = ({
    category,
    name,
}: PedalboardBlockProps) => {
    return (
        <Card className={`w-52 h-52 flex flex-col justify-between transition-transform duration-300 hover:scale-105 ${getCategoryBgColor(category as AvailableCategories)}`}>
            <CardHeader className="flex justify-start items-center gap-3">
                {getCategoryIcon(category as AvailableCategories)}
                <CardDescription className="text-xs font-bold">{category}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
                <span className="text-md text-start font-semibold text-primary">
                    {name}
                </span>
                <div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Circle className="h-3 w-3" />
                            <span>Mono</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <BlendIcon className="h-3 w-3" />
                            <span>Stereo</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PedalboardBlock;