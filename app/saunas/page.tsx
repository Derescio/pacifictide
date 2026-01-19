import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { SaunaCategoryDropdown } from "@/components/sauna-category-dropdown";
import { AutoScroll } from "@/components/auto-scroll";

export default async function SaunasPage() {
    const products = await prisma.product.findMany({
        where: {
            isActive: true,
            type: {
                in: ["cube", "barrel"],
            },
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
            <AutoScroll offsetY={150} />
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

                {/* Category Dropdown */}
                <SaunaCategoryDropdown currentCategory="all" />

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
