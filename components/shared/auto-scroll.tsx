"use client";

import { useEffect } from "react";

interface AutoScrollProps {
    offsetY?: number;
}

export function AutoScroll({ offsetY = 100 }: AutoScrollProps) {
    useEffect(() => {
        // Scroll down by the specified offset
        window.scrollTo({
            top: offsetY,
            behavior: "smooth",
        });
    }, [offsetY]);

    return null;
}

