import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { notFound } from "next/navigation";

const CATEGORIES = [
    { value: "all", label: "All Saunas", href: "/saunas" },
    { value: "cube", label: "Cube", href: "/saunas/cube" },
    { value: "barrel", label: "Barrel", href: "/saunas/barrel" },
    { value: "indoor", label: "Indoor", href: "/saunas/indoor" },
    { value: "outdoor", label: "Outdoor", href: "/saunas/outdoor" },
    { value: "outdoorshowers", label: "Outdoor Showers", href: "/saunas/outdoorshowers" },
];

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    return [
        { category: "cube" },
        { category: "barrel" },
        { category: "indoor" },
        { category: "outdoor" },
        { category: "outdoorshowers" },
    ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    // Validate category
    const validCategories = ["cube", "barrel", "indoor", "outdoor", "outdoorshowers"];
    if (!validCategories.includes(category)) {
        notFound();
    }

    const products = await prisma.product.findMany({
        where: {
            isActive: true,
            type: category,
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

    const categoryLabel = CATEGORIES.find((cat) => cat.value === category)?.label || category;

    console.log(category);
    return (
        <div className="min-h-screen bg-neutral-200">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-600">
                    <Link href="/" className="hover:text-neutral-900">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/saunas" className="hover:text-neutral-900">
                        Saunas
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-neutral-900">{categoryLabel}</span>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                        {categoryLabel} Saunas
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                        Browse our selection of {categoryLabel.toLowerCase()} saunas.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.value}
                            href={cat.href}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${cat.value === category
                                ? "bg-amber-400 text-black"
                                : "bg-white/50 text-neutral-700 hover:bg-white"
                                }`}
                        >
                            {cat.label}
                        </Link>
                    ))}
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="rounded-lg bg-white/50 p-12 text-center">
                        <p className="text-lg text-neutral-600">
                            No {categoryLabel.toLowerCase()} saunas available at the moment.
                        </p>
                        <Link
                            href="/saunas"
                            className="mt-4 inline-block text-amber-600 hover:text-amber-700"
                        >
                            View all saunas →
                        </Link>
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

