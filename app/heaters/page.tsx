import { HeaterCard } from '@/components/shared/heater-card';
import { prisma } from "@/lib/prisma";
import { AutoScroll } from "@/components/shared/auto-scroll";
import { HeaterTypeFilter } from "@/components/shared/heater-type-filter";
import { HeaterType } from "@prisma/client";

interface HeatersPageProps {
    searchParams: Promise<{
        type?: string;
    }>;
}

const HeatersPage = async ({ searchParams }: HeatersPageProps) => {
    const params = await searchParams;
    const typeFilter = params.type as HeaterType | undefined;
    const currentType = typeFilter || "all";

    const heaters = await prisma.heater.findMany({
        where: {
            isActive: true,
            ...(typeFilter && { type: typeFilter }),
        },
        include: {
            images: {
                where: { isPrimary: true },
                take: 1,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="min-h-screen">
            <AutoScroll offsetY={150} />
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                        Our Heaters
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                        Discover our collection of premium sauna heaters, designed to deliver
                        exceptional warmth and performance.
                    </p>
                </div>

                {/* Filter Pills */}
                <HeaterTypeFilter currentType={currentType} />

                {/* Heaters Grid */}
                {heaters.length === 0 ? (
                    <div className="rounded-lg bg-white/50 p-12 text-center">
                        <p className="text-lg text-neutral-600">No heaters available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {heaters.map((heater) => (
                            <HeaterCard key={heater.id} heater={heater} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeatersPage;