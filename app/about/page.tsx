import React from "react";

const AboutPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
            <h1 className="text-3xl font-semibold">About Us</h1>

            <p className="text-gray-700">
                <strong>Pacific Tide</strong> was founded with a simple belief:
                a sauna should be more than just heat — it should be a space for
                restoration, balance, and everyday wellness.
            </p>

            <p className="text-gray-700">
                We specialize in thoughtfully designed, custom-built saunas that blend
                traditional craftsmanship with modern functionality. Whether installed
                indoors or outdoors, our saunas are built to elevate your space and your
                routine.
            </p>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">What We Do</h2>
                <p className="text-gray-700">
                    Every sauna we offer is carefully planned with durability, comfort,
                    and aesthetics in mind. From compact personal saunas to larger
                    statement pieces, we work closely with our customers to ensure each
                    build fits their lifestyle and environment.
                </p>
                <p className="text-gray-700">
                    Because many of our products are custom-made, we focus on quality over
                    mass production — prioritizing materials, finishes, and details that
                    stand the test of time.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Our Approach</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Custom-focused design and planning</li>
                    <li>Durable materials selected for longevity</li>
                    <li>Clear communication from quote to delivery</li>
                    <li>Support before, during, and after installation</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Transparency & Trust</h2>
                <p className="text-gray-700">
                    We believe in being upfront with our customers. Our saunas are not CSA
                    or WETT certified, and we encourage customers to consult local
                    professionals where required for electrical or site preparation.
                </p>
                <p className="text-gray-700">
                    Our policies, timelines, and warranty details are clearly outlined so
                    you can make informed decisions with confidence.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Based in Canada</h2>
                <p className="text-gray-700">
                    Operating primarily within Canada, we understand the demands of
                    Canadian climates and tailor our sauna builds accordingly. From
                    material selection to outdoor durability, our designs are made with
                    real-world conditions in mind.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">Get in Touch</h2>
                <p className="text-gray-700">
                    Have questions or looking to start your custom sauna journey? We’re
                    happy to help.
                </p>
                <ul className="text-gray-700 space-y-1">
                    <li>
                        <strong>Email:</strong> hello@pacifictide.ca
                    </li>
                    <li>
                        <strong>Phone:</strong> +1 (604) 867-5762
                    </li>
                </ul>
            </section>

            <p className="text-gray-700">
                Thank you for considering <strong>Pacific Tide</strong>. We
                look forward to helping you create a space built for relaxation,
                recovery, and long-term wellness.
            </p>
        </div>
    );
};

export default AboutPage;
