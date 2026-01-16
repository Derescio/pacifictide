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

    return (
        <Link
            href={`/saunas/${product.type}/${product.id}`}
            className="group block overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                {primaryImage ? (
                    <Image
                        src={primaryImage.url}
                        alt={primaryImage.altText || product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-neutral-400">
                        No image available
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase text-black">
                    {product.type}
                </div>

                {product.isFeatured && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                        Featured
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="mb-2 font-serif text-xl font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">
                    {product.name}
                </h3>

                {product.designation && (
                    <p className="mb-3 text-sm text-neutral-600">{product.designation}</p>
                )}

                <div className="flex items-baseline justify-between">
                    <div>
                        <span className="text-sm text-neutral-600">Starting at</span>
                        <p className="text-2xl font-bold text-neutral-900">{formattedPrice}</p>
                    </div>

                    <span className="text-sm font-medium text-amber-600 group-hover:underline">
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
    );
}

