"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const saunaCards = [
    {
        category: "Indoor Sauna",
        title: "Nordic Pine Classic",
        src: "/images/huum-v8U1U6FVkeg-unsplash.jpg",
        content: (
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                    Experience the timeless elegance of our Nordic Pine Classic sauna.
                    Crafted from premium Scandinavian pine, this sauna brings the
                    authentic Nordic bathing tradition into your home.
                </p>
                <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
                    <li>Capacity: 2-4 persons</li>
                    <li>Interior: Nordic Pine</li>
                    <li>Heater: 6kW electric</li>
                    <li>Dimensions: 150 x 150 x 200 cm</li>
                </ul>
            </div>
        ),
    },
    {
        category: "Outdoor Sauna",
        title: "Forest Retreat Barrel",
        src: "/images/stephen-h-2fXu4vWSbcA-unsplash.jpg",
        content: (
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                    Our barrel sauna design maximizes heat circulation while creating
                    a stunning focal point in your garden. Perfect for those who want
                    to connect with nature during their sauna sessions.
                </p>
                <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
                    <li>Capacity: 4-6 persons</li>
                    <li>Exterior: Thermowood</li>
                    <li>Heater: Wood-burning or 8kW electric</li>
                    <li>Length: 240 cm</li>
                </ul>
            </div>
        ),
    },
    {
        category: "Premium Series",
        title: "Coastal Cedar Suite",
        src: "/images/huum-v8U1U6FVkeg-unsplash.jpg",
        content: (
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                    The pinnacle of luxury sauna design. Our Coastal Cedar Suite
                    features aromatic Western Red Cedar, panoramic glass panels,
                    and integrated chromotherapy lighting.
                </p>
                <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
                    <li>Capacity: 4-6 persons</li>
                    <li>Interior: Western Red Cedar</li>
                    <li>Heater: 9kW with digital controls</li>
                    <li>Features: Chromotherapy, Bluetooth audio</li>
                </ul>
            </div>
        ),
    },
    {
        category: "Compact Series",
        title: "Urban Zen Pod",
        src: "/images/stephen-h-2fXu4vWSbcA-unsplash.jpg",
        content: (
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                    Designed for modern living spaces, the Urban Zen Pod delivers
                    full sauna benefits in a compact footprint. Ideal for apartments,
                    condos, and smaller homes.
                </p>
                <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
                    <li>Capacity: 1-2 persons</li>
                    <li>Interior: Hemlock</li>
                    <li>Heater: 4.5kW infrared</li>
                    <li>Dimensions: 120 x 100 x 190 cm</li>
                </ul>
            </div>
        ),
    },
    {
        category: "Traditional",
        title: "Finnish Heritage",
        src: "/images/huum-v8U1U6FVkeg-unsplash.jpg",
        content: (
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400">
                    Honor centuries of Finnish sauna tradition with our Heritage model.
                    Authentic löyly experience with traditional wood-burning stove and
                    hand-selected sauna stones.
                </p>
                <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
                    <li>Capacity: 6-8 persons</li>
                    <li>Interior: Aspen & Alder</li>
                    <li>Heater: Wood-burning with 80kg stones</li>
                    <li>Traditional bucket & ladle included</li>
                </ul>
            </div>
        ),
    },
];

export function SaunasCarousel() {
    const cards = saunaCards.map((card, index) => (
        <Card key={card.title} card={card} index={index} />
    ));

    return (
        <section className="py-6">
            <div className="mb-8 px-4">
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                    Explore Our Saunas
                </h2>
                <p className="mt-2 text-lg text-neutral-800">
                    Handcrafted saunas designed to transform your wellness routine.
                </p>
            </div>
            <Carousel items={cards} />
        </section>
    );
}

