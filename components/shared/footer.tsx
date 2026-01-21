import Link from "next/link";
import Image from "next/image";

const footerLinks = {
    company: {
        title: "Our Company",
        links: [
            { label: "About Us", href: "/about" },
            // { label: "Our Story", href: "/story" },
            // { label: "Craftsmanship", href: "/craftsmanship" },
            // { label: "Sustainability", href: "/sustainability" },
            // { label: "Careers", href: "/careers" },
        ],
    },
    products: {
        title: "Products",
        links: [
            { label: "Saunas", href: "/saunas" },
            { label: "Heaters", href: "/heaters" },
            { label: "Hot & Cold Plunge", href: "/plunge" },
            // { label: "Accessories", href: "/accessories" },
            // { label: "Custom Builds", href: "/custom" },
        ],
    },
    support: {
        title: "Support",
        links: [
            { label: "Help Center", href: "/help", external: true },
            { label: "Shipping & Delivery", href: "/shipping" },
            { label: "Returns & Warranty", href: "/warranty" },
            { label: "Installation Guide", href: "/installation", external: true },
            { label: "Care & Maintenance", href: "/care" },
            { label: "Contact Us", href: "/contact" },
        ],
    },
    connect: {
        title: "Connect",
        links: [
            { label: "Blog", href: "/blog" },
            { label: "Facebook", href: "https://facebook.com", external: true },
            { label: "Instagram", href: "https://instagram.com", external: true },
            //     { label: "Pinterest", href: "https://pinterest.com", external: true },
            //     { label: "YouTube", href: "https://youtube.com", external: true },
        ],
    },
};

const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Cookie Policy", href: "/cookies" },
];

export function Footer() {
    return (
        <footer className="bg-neutral-900 text-white">
            <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
                {/* Main Footer Content */}
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Newsletter Section */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="shrink-0">
                            <Image
                                src="/images/White 2.png"
                                alt="Pacific Tide"
                                width={0}
                                height={0}
                                // style={{ width: 'auto', height: 'auto' }}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                                className="h-40 w-auto opacity-70 transition-opacity hover:opacity-100"
                            />
                        </Link>


                        <h3 className="font-serif text-2xl font-light italic leading-tight text-white/90 md:text-3xl">
                            Stay inspired with
                            <br />
                            wellness tips & offers
                        </h3>

                        {/* Email Input */}
                        {/* <form className="mt-6">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="flex-1 rounded-l-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                />
                                <button
                                    type="submit"
                                    className="rounded-r-full bg-white/10 px-5 py-3 transition-colors hover:bg-white/20"
                                    aria-label="Subscribe"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-sm leading-relaxed text-white/50">
                            We care about protecting your data.
                            <br />
                            Read more in our{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-2 transition-colors hover:text-white/70"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p> */}
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-8">
                        {Object.values(footerLinks).map((section) => (
                            <div key={section.title}>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400/80">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                // target={link.external ? "_blank" : undefined}
                                                // rel={link.external ? "noopener noreferrer" : undefined}
                                                className="group flex items-center text-sm text-white/70 transition-colors hover:text-white"
                                            >
                                                {link.label}
                                                {/* {link.external && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                                        />
                                                    </svg>
                                                )} */}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="my-12 border-t border-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Logo */}


                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs text-white/50 transition-colors hover:text-white/70"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <p className="mt-6 text-sm text-white/40">
                    © {new Date().getFullYear()} Pacific Tide. All rights reserved. Pacific Tide and the Pacific Tide logo are trademarks of Pacific Tide LLC and may not be used without permission.
                </p>
                <p className="mt-6 text-sm text-white/40">
                    Powered by <Link href="https://www.opsedsolutions.com" className="text-white/70 transition-colors hover:text-white">Opsedsolutions</Link>
                </p>
            </div>
        </footer>
    );
}

