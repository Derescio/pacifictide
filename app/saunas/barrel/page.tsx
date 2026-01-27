import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ProductCard } from '@/components/shared/product-card';
import { SaunaCategoryDropdown } from "@/components/shared/sauna-category-dropdown";

export const revalidate = 3600;

const BarrelPage = async () => {
    const products = await prisma.product.findMany({
        where: {
            isActive: true,
            type: {
                in: ["barrel"],
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
        <div className="min-h-screen">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-600">
                    <Link href="/" className="hover:text-neutral-900">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-neutral-900">Outdoor Products</span>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                        Barrel Saunas
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                        Explore our classic barrel-style saunas, featuring traditional design and authentic sauna experience.
                    </p>
                </div>

                {/* Category Dropdown */}
                <SaunaCategoryDropdown currentCategory="barrel" />

                {/* Category Sections */}
                <div className="space-y-12">
                    {/* Hot Tubs & Cold Plunge */}
                    {products.filter((p) => p.type === "barrel").length > 0 && (
                        <section>
                            <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
                                Barrel Saunas
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products
                                    .filter((p) => p.type === "barrel")
                                    .map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                            </div>
                        </section>
                    )}

                    {/* Outdoor Showers */}
                    {/* {products.filter((p) => p.type === "outdoorshowers").length > 0 && (
                        <section>
                            <h2 className="mb-6 text-2xl font-semibold text-neutral-900">Outdoor Showers</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products
                                    .filter((p) => p.type === "outdoorshowers")
                                    .map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                            </div>
                        </section>
                    )} */}

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="rounded-lg bg-white/50 p-12 text-center">
                            <p className="text-lg text-neutral-600">
                                No outdoor products available at the moment.
                            </p>
                            <Link
                                href="/saunas"
                                className="mt-4 inline-block text-amber-600 hover:text-amber-700"
                            >
                                View our saunas →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BarrelPage