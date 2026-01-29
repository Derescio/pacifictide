"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const saunaCards = [
    {
        category: "Cube Sauna",
        title: "The Max",
        src: "/images/Max_Image_New_1.jpg",
        url: "/saunas/cube/cmkk9bffr004n9c20ewohnscf",
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
        title: "The Neptune",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1720653214/torontosaunaco/Cubes/NE6110/neptune_900x_u29c1e.webp",
        url: "/saunas/cube/cmkk9bgs8005m9c2049ckdtuu",
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
        title: "The Glacier",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1742164481/Arctic_Knotty_1_qzrx7j.jpg",
        url: "/saunas/outdoor/cmkk9be6500319c20pdluewm3",
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
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1720653426/torontosaunaco/Cubes/PU550%28Indoor%29/indoor550_dakclp.webp",
        url: "/saunas/indoor/cmkk9bmzn00a09c20mvrbtxys",
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
        title: "Panoramic Sauna",
        src: "https://res.cloudinary.com/dw4ev5whz/image/upload/v1762896445/torontosaunaco/Barrell/Panoramic_2_ztinlc.png",
        url: "/saunas/barrel/cmkk9blfo008m9c20cm8u5fdb",
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

