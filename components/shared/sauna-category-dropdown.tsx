"use client";

import { useRouter } from "next/navigation";

const CATEGORIES = [
    { value: "all", label: "All Saunas", href: "/saunas" },
    { value: "cube", label: "Cube", href: "/saunas/cube" },
    { value: "barrel", label: "Barrel", href: "/saunas/barrel" },
    { value: "indoor", label: "Indoor", href: "/saunas/indoor" },
    { value: "outdoor", label: "Outdoor", href: "/saunas/outdoor" },
    { value: "outdoorshowers", label: "Outdoor Showers", href: "/saunas/outdoorshowers" },
];

interface SaunaCategoryDropdownProps {
    currentCategory?: string;
}

export function SaunaCategoryDropdown({ currentCategory = "all" }: SaunaCategoryDropdownProps) {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = CATEGORIES.find((cat) => cat.value === e.target.value);
        if (selectedCategory) {
            router.push(selectedCategory.href);
        }
    };

    return (
        <div className="mb-8 flex items-center gap-4">
            <label htmlFor="sauna-category" className="text-lg font-medium text-neutral-700">
                Choose Saunas:
            </label>
            <select
                id="sauna-category"
                value={currentCategory}
                onChange={handleChange}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-700 shadow-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            >
                {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

