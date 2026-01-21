import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";

type HeaterWithImages = Prisma.HeaterGetPayload<{
    include: {
        images: {
            where: { isPrimary: true };
            take: 1;
        };
    };
}>;

interface HeaterCardProps {
    heater: HeaterWithImages;
}

export function HeaterCard({ heater }: HeaterCardProps) {
    const primaryImage = heater.images[0];
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(Number(heater.basePrice));

    // Get specs from the heater
    const specs = heater.specifications as any;
    const electricSpec = heater.electricSpec as any;
    const woodSpec = heater.woodSpec as any;

    // Determine heater type display
    const typeDisplay = heater.type === "ELECTRIC" ? "Electric Heater" : "Wood-Burning Heater";

    // Get power or other key spec
    const keySpec = electricSpec?.power
        ? `${electricSpec.power} kW`
        : specs?.room_size || specs?.capacity;

    return (
        <>
            <div className="border border-neutral-150">
                <Link
                    href={`/heaters/${heater.id}`}
                    className="group block overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
                >
                    <div className="relative aspect-square overflow-hidden bg-neutral-50">
                        {primaryImage && (
                            <Image
                                src={primaryImage.url}
                                alt={primaryImage.altText || heater.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}

                        {heater.isFeatured && (
                            <div className="absolute right-3 top-3 rounded-sm bg-black/75 px-2.5 py-1 text-xs uppercase tracking-wide text-white">
                                Featured
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-neutral-50">
                        {/* Title and Price Row */}
                        <div className="mb-2 flex items-start justify-between ">
                            <h3 className="font-serif text-lg italic leading-tight text-neutral-800">
                                {heater.name}
                            </h3>
                            <span className="ml-4 shrink-0 text-md text-neutral-600">
                                <span className="text-xs tracking-wider text-neutral-500">From </span>{formattedPrice}
                            </span>
                        </div>

                        {/* Type */}
                        <p className="mb-4 text-xs uppercase tracking-wider text-neutral-500">
                            {typeDisplay}
                        </p>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {keySpec && (
                                <div className="flex items-center gap-4">
                                    <span className="rounded-xs border border-neutral-200 px-2 py-1 text-xs uppercase tracking-wide text-neutral-600">
                                        {keySpec}
                                    </span>
                                </div>
                            )}
                            {heater.model && (
                                <div className="flex items-center gap-4">
                                    <span className="rounded-xs border border-neutral-200 px-2 py-1 text-xs uppercase tracking-wide text-neutral-600">
                                        {heater.model}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

