import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";

const CATEGORIES = [
    { value: "all", label: "All Saunas", href: "/saunas" },
    { value: "cube", label: "Cube", href: "/saunas/cube" },
    { value: "barrel", label: "Barrel", href: "/saunas/barrel" },
    { value: "indoor", label: "Indoor", href: "/saunas/indoor" },
    { value: "outdoor", label: "Outdoor", href: "/saunas/outdoor" },
    { value: "outdoorshowers", label: "Outdoor Showers", href: "/saunas/outdoorshowers" },
];

export default async function SaunasPage() {
    const products = await prisma.product.findMany({
        where: {
            isActive: true,
        },
        include: {
            images: {
                where: { isPrimary: true },
                take: 1,
            },
        },
        orderBy: [
            { displayOrder: "asc" },
            { createdAt: "desc" },
        ],
    });

    return (
        <div className="min-h-screen ">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                        Our Saunas
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                        Discover our collection of premium saunas, designed to bring wellness and
                        relaxation into your home.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-3">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.value}
                            href={category.href}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${category.value === "all"
                                ? "bg-amber-400 text-black"
                                : "bg-white/50 text-neutral-700 hover:bg-white"
                                }`}
                        >
                            {category.label}
                        </Link>
                    ))}
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="rounded-lg bg-white/50 p-12 text-center">
                        <p className="text-lg text-neutral-600">No saunas available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
