import Image from "next/image";

interface Partner {
    name: string;
    logo: string;
    width: number;
    height: number;
}

const partners: Partner[] = [
    {
        name: "Leisure Craft",
        logo: "/images/LeisureCraftLogo.png",
        width: 200,
        height: 80,
    },
    {
        name: "Harvia",
        logo: "/images/Harvia.jpg",
        width: 180,
        height: 80,
    },
    {
        name: "Humm",
        logo: "/images/humm_logo.jpg",
        width: 150,
        height: 80,
    },
    {
        name: "Partner",
        logo: "/images/IMG_6766.png",
        width: 180,
        height: 80,
    },
];

export function TrustedPartners() {
    return (
        <section className="bg-neutral-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="font-serif text-3xl font-light italic text-neutral-900 md:text-4xl">
                        Trusted Partners
                    </h2>
                    <p className="mt-4 text-neutral-600">
                        Working with leading brands to deliver exceptional quality
                    </p>
                </div>

                {/* Partner Logos Grid */}
                <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-4 lg:gap-12">
                    {partners.map((partner) => (
                        <div
                            key={partner.name}
                            className="group relative flex h-24 w-full items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <Image
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                width={partner.width}
                                height={partner.height}
                                className="h-auto w-auto max-h-16 max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

