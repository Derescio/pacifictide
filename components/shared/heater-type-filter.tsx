"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface HeaterTypeFilterProps {
    currentType: string;
}

const HEATER_TYPES = [
    { value: "all", label: "All Heaters" },
    { value: "ELECTRIC", label: "Electric" },
    { value: "WOOD", label: "Wood-Burning" },
];


export function HeaterTypeFilter({ currentType }: HeaterTypeFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (type === "all") {
            params.delete("type");
        } else {
            params.set("type", type);
        }
        const queryString = params.toString();
        router.push(queryString ? `/heaters?${queryString}` : "/heaters");
    };

    return (
        <div className="mb-8 flex flex-wrap gap-3">
            {HEATER_TYPES.map((type) => (
                <button
                    key={type.value}
                    onClick={() => handleTypeChange(type.value)}
                    className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${currentType === type.value
                        ? "bg-[#E9DFD2] text-black shadow-md"
                        : "bg-white text-neutral-700 hover:bg-neutral-100"
                        }`}
                >
                    {type.label}
                </button>
            ))}
        </div>
    );
}

