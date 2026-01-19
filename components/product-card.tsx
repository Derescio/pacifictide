import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";

type ProductWithImages = Prisma.ProductGetPayload<{
    include: {
        images: {
            where: { isPrimary: true };
            take: 1;
        };
    };
}>;

interface ProductCardProps {
    product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
    const primaryImage = product.images[0];
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(Number(product.basePrice));

    // Get capacity and features from specifications if available
    const specs = product.specifications as any;
    const capacity = specs?.capacity || specs?.room_size;
    const features = specs?.features || [];

    // Parse wood type if it's a JSON string
    let woodTypeDisplay = null;
    if (product.woodType) {
        try {
            const woodTypeObj = typeof product.woodType === 'string'
                ? JSON.parse(product.woodType)
                : product.woodType;

            // Get the first wood type name from the object
            const firstWoodType = Object.keys(woodTypeObj)[0];
            if (firstWoodType && firstWoodType !== 'undefined') {
                woodTypeDisplay = firstWoodType;
            }
        } catch {
            // If it's not JSON, use it as-is
            woodTypeDisplay = product.woodType;
        }
    }

    return (
        <>
            <div className="border border-neutral-150">
                <Link
                    href={`/saunas/${product.type}/${product.id}`}
                    className="group block overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
                >
                    <div className="relative aspect-square overflow-hidden bg-neutral-50">
                        {primaryImage && (
                            <Image
                                src={primaryImage.url}
                                alt={primaryImage.altText || product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}

                        {product.isFeatured && (
                            <div className="absolute right-3 top-3 rounded-sm bg-black/75 px-2.5 py-1 text-xs uppercase tracking-wide text-white">
                                Featured
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-neutral-50">
                        {/* Title and Price Row */}
                        <div className="mb-2 flex items-start justify-between ">
                            <h3 className="font-serif text-lg italic leading-tight text-neutral-800">
                                {product.name}
                            </h3>
                            <span className="ml-4 shrink-0 text-md text-neutral-600">
                                <span className="text-xs tracking-wider text-neutral-500">From </span>{formattedPrice}
                            </span>
                        </div>

                        {/* Designation/Category */}
                        <p className="mb-4 text-xs uppercase tracking-wider text-neutral-500">
                            {product.designation || product.type}
                        </p>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {capacity && (
                                <span className="text-xs uppercase tracking-wide text-neutral-600">
                                    {capacity}
                                </span>
                            )}
                            {/* {woodTypeDisplay && (
                        <span className="text-xs uppercase tracking-wide text-neutral-600">
                            {woodTypeDisplay}
                        </span>
                    )} */}
                            {features.length > 0 && (
                                <div className="flex items-center gap-4">
                                    {features
                                        .slice(0, 2)
                                        .map((feature: any, index: number) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="rounded-xs border border-neutral-200 px-2 py-1 text-xs uppercase tracking-wide text-neutral-600">
                                                    {feature.name || feature}
                                                </span>
                                                {/* {index === 0 && features.length > 1 && (
                                            <span className="text-neutral-600 text-xl">.</span>
                                        )} */}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </>

    );
}

