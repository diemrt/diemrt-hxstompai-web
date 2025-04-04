import { useQuery } from "@tanstack/react-query";
import PedalboardBlock from "./PedalboardBlock";
import { useEffect, useState, useMemo } from "react";

const CarouselPedalboardBlocks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["pedalboardBlocks"],
        queryFn: () =>
            fetch("http://localhost:8000/api/pedals").then((res) => res.json()),
    });

    // State for tracking carousel position
    const [position, setPosition] = useState(0);

    // Randomize and duplicate the items array for continuous scrolling
    const shuffledItems = useMemo(() => {
        if (!data?.data?.items) return [];
        const items = [...data.data.items];
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        // Duplicate the array to create seamless loop
        return [...items, ...items];
    }, [data]);

    // Animation effect
    useEffect(() => {
        if (!shuffledItems.length) return;
        
        const interval = setInterval(() => {
            setPosition((prev) => {
                // Reset position when reaching half of items (before duplicate)
                if (prev >= shuffledItems.length / 2) {
                    return 0;
                }
                return prev + 1;
            });
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(interval);
    }, [shuffledItems]);

    if (isLoading) {
        return null;
    }
    if (!data) {
        return null;
    }

    return (
        <div className="fixed opacity-30 bottom-0 left-0 right-0 h-[300px] -z-10 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-full bg-gradient-to-b from-background via-background/95 to-transparent" />
            <div className="relative w-full h-full">
                <div 
                    className="flex gap-8 transition-transform duration-[2000ms] ease-in-out absolute bottom-0 pb-8"
                    style={{
                        transform: `translateX(-${position * (300 + 32)}px)`,
                    }}
                >
                    {shuffledItems.map((block: any, index: number) => (
                        <PedalboardBlock
                            key={`${block.id}-${index}`}
                            category={block.category}
                            name={block.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarouselPedalboardBlocks;