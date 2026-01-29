import { prisma } from "@/lib/prisma";
import { ProductImageGallery } from "@/components/shared/product-image-gallery";
import { ProductOptionsSelector } from "@/components/shared/product-options-selector";
//import { ProductSpecifications } from "@/components/shared/product-specifications";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutoScroll } from "@/components/shared/auto-scroll";

interface ProductPageProps {
    params: Promise<{
        category: string;
        productId: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, productId } = await params;

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
            isActive: true,
        },
        include: {
            images: {
                orderBy: { order: "asc" },
            },
            options: {
                orderBy: { name: "asc" },
            },
            heaters: {
                include: {
                    heater: {
                        include: {
                            images: true,
                        },
                    },
                },
            },
        },
    });

    if (!product) {
        notFound();
    }

    // Verify the category matches
    if (product.type !== category) {
        notFound();
    }

    const categoryLabel = {
        cube: "Cube",
        barrel: "Barrel",
        indoor: "Indoor",
        outdoor: "Outdoor",
        outdoorshowers: "Outdoor Showers",
    }[category] || category;

    const { basePrice, name, series, description, images, options, heaters, dimensions, specifications, designation, woodType } = product
    //convert basePrice to number
    const basePriceNumber = Number(basePrice)

    return (
        <div className="min-h-screen">
            <AutoScroll offsetY={170} />
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
                    <Link href={`/saunas/${category}`} className="hover:text-neutral-900">
                        {categoryLabel}
                    </Link>
                    <span>/</span>
                    <span className="font-medium text-neutral-900">{product.name}</span>
                </nav>

                {/* Product Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-2xl font-light italic text-neutral-900 md:text-5xl">
                        {name}
                    </h1>
                    {product.series && (
                        <p className="mt-2 text-lg text-neutral-600">Series: {series}</p>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Column - Images */}
                    <div>
                        <ProductImageGallery images={images} productName={name} />

                        {/* Dimensions and Features Below Images */}
                        <div className="mt-6 space-y-4">
                            {/* Dimensions */}
                            {dimensions && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-2 text-lg font-semibold text-neutral-900">Dimensions</h3>
                                    <div className="text-neutral-700">
                                        {(() => {
                                            try {
                                                const dims = typeof dimensions === 'string' ? JSON.parse(dimensions) : dimensions;
                                                return (
                                                    <p>
                                                        <span className="font-medium">{dims.width}" W</span> × {" "}
                                                        <span className="font-medium">{dims.depth}" D</span> × {" "}
                                                        <span className="font-medium">{dims.height}" H</span>
                                                        {dims.type && ` (${dims.type})`}
                                                    </p>
                                                );
                                            } catch {
                                                return <p>{typeof dimensions === 'string' ? dimensions : JSON.stringify(dimensions)}</p>;
                                            }
                                        })()}
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            {specifications && (specifications as any).features && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">Features</h3>
                                    <ul className="space-y-2">
                                        {Array.isArray((specifications as any).features) ? (
                                            (specifications as any).features.map((feature: any, idx: number) => (
                                                <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                                    <span>{typeof feature === 'string' ? feature : feature.description || feature.title}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-neutral-700">
                                                {JSON.stringify((specifications as any).features)}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Designation/Collection */}
                            {designation && (
                                <div className="rounded-lg bg-white/50 p-4">
                                    <h3 className="mb-2 text-lg font-semibold text-neutral-900">Collection</h3>
                                    <p className="text-neutral-700">{designation}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Product Info */}
                    <div>
                        {/* Description */}
                        <div className="mb-2 rounded-lg bg-white/50">
                            <h2 className="mb-4 text-4xl  font-playfair text-gray-500">{name}</h2>
                            <h4 className="text-xl font-semibold text-black font-Arsenal"> ${basePriceNumber}</h4>
                            <p className="leading-relaxed text-neutral-700 mt-4">{description}</p>
                        </div>

                        {/* Options Selector */}
                        <ProductOptionsSelector
                            product={{
                                id: product.id,
                                name: name,
                                basePrice: basePriceNumber,
                                options: options.map((opt) => ({
                                    ...opt,
                                    price: Number(opt.price),
                                })),
                                heaters: heaters.map((ph) => ({
                                    ...ph.heater,
                                    basePrice: Number(ph.heater.basePrice),
                                    electricSpec: ph.heater.electricSpec as any,
                                    woodSpec: ph.heater.woodSpec as any,
                                })),
                            }}
                        />
                    </div>
                </div>

                {/* Specifications Section */}
                {/* <div className="mt-12">
                    <ProductSpecifications
                        dimensions={dimensions}
                        specifications={specifications as any}
                        designation={designation}
                        woodType={woodType}
                    />
                </div> */}
            </div>
        </div>
    );
}

