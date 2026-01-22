"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const saunaCards = [
    {
        category: "Cube Sauna",
        title: "The Max",
        src: "/images/Max_Image_New_1.jpg",
        url: "/saunas/cube",
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
        category: "Barrel Sauna",
        title: "Panoramic Barrel Sauna",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1762898747/torontosaunaco/Barrell/IMG-20251111-WA0097_vtdwjx.jpg",
        url: "/saunas/barrel",
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
        category: "Cold Plunge",
        title: "Glacier Cold Plunge",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1764645001/torontosaunaco/coldplunge/IMG-20251201-WA0005_xl97h9.jpg",
        url: "/saunas/coldplunge",
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
        category: "Indoor Sauna",
        title: "The Cube 550",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1720652998/torontosaunaco/Cubes/CU550/CU550_1_900_hehapo.jpg",
        url: "/saunas/indoor",
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
        category: "Cube Sauna",
        title: "The Hudson",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1720653158/torontosaunaco/Cubes/HU6110/hudson_900_pgonnk.jpg",
        url: "/saunas/cube",
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
];

export function SaunasCarousel() {
    const cards = saunaCards.map((card, index) => (
        <Card key={card.title} card={card} index={index} />
    ));

    return (
        <section className="py-6">
            <div className="mb-2 px-4">
                <h1 className="md:text-center font-serif text-4xl font-light italic text-neutral-900 md:text-5xl">
                    Featured Saunas
                </h1>
                {/* <p className="mt-2 text-lg text-neutral-800">
                    Have a look at some of our top sellers to fit your lifestyle.
                </p> */}
            </div>
            <Carousel items={cards} />
        </section>
    );
}

