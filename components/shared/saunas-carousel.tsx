"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

interface FeaturedProduct {
    id: string;
    name: string;
    description: string;
    type: string;
    specifications: {
        features?: string[];
    } | null;
    images: {
        url: string;
        isPrimary: boolean;
    }[];
}

interface SaunasCarouselClientProps {
    products: FeaturedProduct[];
}

// Category label mapping
const categoryLabels: Record<string, string> = {
    cube: "Cube Sauna",
    barrel: "Barrel Sauna",
    indoor: "Indoor Sauna",
    outdoor: "Outdoor Sauna",
    outdoorshowers: "Outdoor Shower",
};

export function SaunasCarouselClient({ products }: SaunasCarouselClientProps) {
    const cards = products.map((product, index) => {
        // Get primary image or first image
        const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
        const imageUrl = primaryImage?.url || "/images/placeholder.jpg";

        // Get features from specifications
        const features = product.specifications?.features || [];

        // Build the card content
        const content = (
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                    {product.description}
                </p>
                {features.length > 0 && (
                    <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
                        {features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                )}
            </div>
        );

        const card = {
            category: categoryLabels[product.type] || product.type,
            title: product.name,
            src: imageUrl,
            url: `/saunas/${product.type}/${product.id}`,
            content,
        };

        return <Card key={product.id} card={card} index={index} />;
    });

    return (
        <section className="py-6">
            <div className="mb-2 px-4">
                <h1 className="md:text-center font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                    Featured Saunas
                </h1>
            </div>
            <Carousel items={cards} />
        </section>
    );
}
