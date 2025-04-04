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
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Pedalboard Blocks
            </h1>
            <div className="relative w-full overflow-hidden mt-8">
                <div 
                    className="flex gap-4 transition-transform duration-1000"
                    style={{
                        transform: `translateX(-${position * (200 + 16)}px)`, // 200px for card width + 16px for gap
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