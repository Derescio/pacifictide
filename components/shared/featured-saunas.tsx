import { prisma } from "@/lib/prisma";
import { SaunasCarouselClient } from "./saunas-carousel";

export async function FeaturedSaunas() {
    const featuredProducts = await prisma.product.findMany({
        where: {
            isActive: true,
            isFeatured: true,
        },
        include: {
            images: {
                orderBy: { order: "asc" },
            },
        },
        orderBy: [
            { displayOrder: "asc" },
            { createdAt: "desc" },
        ],
    });

    // Transform Prisma data to match the expected interface
    const products = featuredProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        type: product.type,
        specifications: product.specifications as { features?: string[] } | null,
        images: product.images.map((img) => ({
            url: img.url,
            isPrimary: img.isPrimary,
        })),
    }));

    // Don't render if no featured products
    if (products.length === 0) {
        return null;
    }

    return <SaunasCarouselClient products={products} />;
}

