import { prisma } from "@/lib/prisma";
import { ProductImageGallery } from "@/components/shared/product-image-gallery";
import Link from "next/link";
import { notFound } from "next/navigation";

interface HeaterPageProps {
    params: Promise<{
        heaterId: string;
    }>;
}

export default async function HeaterPage({ params }: HeaterPageProps) {
    const { heaterId } = await params;

    const heater = await prisma.heater.findUnique({
        where: {
            id: heaterId,
            isActive: true,
        },
        include: {
            images: {
                orderBy: { order: "asc" },
            },
        },
    });

    if (!heater) {
        notFound();
    }

    const { basePrice, name, description, images, model, type } = heater;
    const basePriceNumber = Number(basePrice);

    // Get specs
    const specs = heater.specifications as any;
    const electricSpec = heater.electricSpec as any;
    const woodSpec = heater.woodSpec as any;
    const warranty = heater.warranty as any;
    const features = heater.features as any[];
    const installation = heater.installation as any;

    const typeLabel = type === "ELECTRIC" ? "Electric Heater" : "Wood-Burning Heater";

    return (
        <div className="min-h-screen">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-600">
                    <Link href="/" className="hover:text-neutral-900">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/heaters" className="hover:text-neutral-900">
                        Heaters
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-neutral-900">{name}</span>
                </nav>

                {/* Heater Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-2xl font-light italic text-neutral-900 md:text-5xl">
                        {name}
                    </h1>
                    <p className="mt-2 text-lg text-neutral-600">Model: {model}</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Column - Images */}
                    <div>
                        <ProductImageGallery images={images} productName={name} />

                        {/* Specifications Below Images */}
                        <div className="mt-6 space-y-4">
                            {/* Type */}
                            <div className="rounded-lg bg-white/50 p-4">
                                <h3 className="mb-2 text-lg font-semibold text-neutral-900">Type</h3>
                                <p className="text-neutral-700">{typeLabel}</p>
                            </div>

                            {/* Electric Specifications */}
                            {type === "ELECTRIC" && electricSpec && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                                        Electric Specifications
                                    </h3>
                                    <div className="space-y-2 text-neutral-700">
                                        {electricSpec.power && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Power:</span>
                                                <span>{electricSpec.power} kW</span>
                                            </div>
                                        )}
                                        {electricSpec.voltage && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Voltage:</span>
                                                <span>{electricSpec.voltage}</span>
                                            </div>
                                        )}
                                        {electricSpec.electricianRequired !== undefined && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Electrician Required:</span>
                                                <span>{electricSpec.electricianRequired ? "Yes" : "No"}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Wood Specifications */}
                            {type === "WOOD" && woodSpec && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                                        Wood-Burning Specifications
                                    </h3>
                                    <div className="space-y-2 text-neutral-700">
                                        {woodSpec.fuelType && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Fuel Type:</span>
                                                <span className="capitalize">{woodSpec.fuelType}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* General Specifications */}
                            {specs && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                                        Specifications
                                    </h3>
                                    <div className="space-y-2 text-neutral-700">
                                        {specs.room_size && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Room Size:</span>
                                                <span>
                                                    {typeof specs.room_size === "string"
                                                        ? specs.room_size
                                                        : specs.room_size.imperial || specs.room_size.metric || JSON.stringify(specs.room_size)}
                                                </span>
                                            </div>
                                        )}
                                        {specs.stone_capacity && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Stone Capacity:</span>
                                                <span>
                                                    {typeof specs.stone_capacity === "string"
                                                        ? specs.stone_capacity
                                                        : specs.stone_capacity.imperial || specs.stone_capacity.metric || JSON.stringify(specs.stone_capacity)}
                                                </span>
                                            </div>
                                        )}
                                        {specs.dimensions && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Dimensions:</span>
                                                <span>
                                                    {typeof specs.dimensions === "string"
                                                        ? specs.dimensions
                                                        : specs.dimensions.imperial
                                                            ? specs.dimensions.imperial
                                                            : specs.dimensions.width &&
                                                                specs.dimensions.depth &&
                                                                specs.dimensions.height
                                                                ? `${specs.dimensions.width}" W × ${specs.dimensions.depth}" D × ${specs.dimensions.height}" H`
                                                                : JSON.stringify(specs.dimensions)}
                                                </span>
                                            </div>
                                        )}
                                        {specs.weight && (
                                            <div className="flex justify-between">
                                                <span className="font-medium">Weight:</span>
                                                <span>
                                                    {typeof specs.weight === "string"
                                                        ? specs.weight
                                                        : specs.weight.imperial || specs.weight.metric || JSON.stringify(specs.weight)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            {features && features.length > 0 && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">Features</h3>
                                    <ul className="space-y-2">
                                        {features.map((feature: any, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                                <span>
                                                    {typeof feature === "string"
                                                        ? feature
                                                        : feature.name || feature.description}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Warranty */}
                            {warranty && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-2 text-lg font-semibold text-neutral-900">Warranty</h3>
                                    <p className="text-neutral-700">
                                        {warranty.duration && <span className="font-medium">{warranty.duration}</span>}
                                        {warranty.description && <span> - {warranty.description}</span>}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Heater Info and Purchase */}
                    <div>
                        {/* Description */}
                        <div className="mb-6 rounded-lg bg-white/50 p-6">
                            <h2 className="mb-4 font-playfair text-4xl text-gray-500">{name}</h2>
                            <h4 className="font-Arsenal text-xl font-semibold text-amber-400">
                                ${basePriceNumber.toLocaleString()}
                            </h4>
                            <p className="mt-4 leading-relaxed text-neutral-700">{description}</p>
                        </div>

                        {/* Options/Add-ons (if heater has options) */}
                        {heater.options && Object.keys(heater.options as any).length > 0 && (
                            <div className="mb-6 rounded-lg bg-white/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-neutral-900">Available Options</h3>
                                <div className="space-y-4">
                                    {Object.entries(heater.options as Record<string, any[]>).map(
                                        ([optionKey, optionValues]) => {
                                            const optionLabel =
                                                optionKey.charAt(0).toUpperCase() +
                                                optionKey.slice(1).replace(/([A-Z])/g, " $1");
                                            return (
                                                <div key={optionKey}>
                                                    <h4 className="mb-2 font-medium text-neutral-700">
                                                        {optionLabel}
                                                    </h4>
                                                    <ul className="space-y-1 pl-4">
                                                        {optionValues.map((option: any, idx: number) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-center gap-2 text-sm text-neutral-600"
                                                            >
                                                                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                                                                <span>
                                                                    {option.type}
                                                                    {option.price > 0 && (
                                                                        <span className="ml-2 text-amber-600">
                                                                            +${option.price}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Installation Info */}
                        {installation && (
                            <div className="mb-6 rounded-lg bg-white/50 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-neutral-900">Installation</h3>
                                <div className="space-y-2 text-neutral-700">
                                    {typeof installation === "string" ? (
                                        <p>{installation}</p>
                                    ) : installation.description ? (
                                        <p>{installation.description}</p>
                                    ) : (
                                        <>
                                            {installation.requirements && (
                                                <div>
                                                    <p className="font-medium">Requirements:</p>
                                                    <p className="text-sm">{installation.requirements}</p>
                                                </div>
                                            )}
                                            {installation.safetyDistances && (
                                                <div>
                                                    <p className="font-medium">Safety Distances:</p>
                                                    <p className="text-sm">{typeof installation.safetyDistances === "string" ? installation.safetyDistances : JSON.stringify(installation.safetyDistances)}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Purchase Button */}
                        <button className="w-full rounded-lg bg-amber-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-amber-600">
                            Add to Cart
                        </button>

                        {/* Contact for Quote */}
                        <div className="mt-4 text-center">
                            <Link
                                href="/contact"
                                className="text-sm text-neutral-600 hover:text-neutral-900 underline"
                            >
                                Contact us for a custom quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

