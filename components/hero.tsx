import Image from "next/image";
import Link from "next/link";
import { NavAuth } from "@/components/nav-auth";
import { MobileNav } from "@/components/mobile-nav";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/saunas", label: "Saunas" },
    { href: "/heaters", label: "Heaters" },
    { href: "/plunge", label: "Hot and Cold Plunge" },
    { href: "/about", label: "About" },
];

interface HeroProps {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role: string;
    } | null;
}

export function Hero({ user }: HeroProps) {
    return (
        <section className="relative overflow-hidden rounded-[10px] shadow-xl">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/bg_hero.jpg"
                    alt="Mountain landscape with lake"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/72" />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-12">
                    {/* Logo */}
                    <Link href="/" className="hrink-0">
                        <Image
                            src="/images/White 2.png"
                            alt="Pacific Tide"
                            width={0}
                            height={0}
                            // style={{ width: 'auto', height: 'auto' }}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="h-48 w-auto md:h-48 lg:h-[140px]"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 lg:flex lg:mt-[-10px]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-md font-medium font-arsenal text-white/90 transition-colors hover:text-white"
                            // className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-gray-100 backdrop-blur-md transition-colors hover:bg-white/20 sm:inline-flex"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth / Avatar */}
                    <div className="flex items-center gap-4 mt-[-32px]">
                        <NavAuth user={user} />

                        {/* Mobile Menu */}
                        <MobileNav />
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16 lg:px-12 lg:pb-32 lg:pt-20">
                    <div className="max-w-2xl">
                        <h1 className="font-serif text-4xl font-light italic leading-tight text-white md:text-5xl lg:text-6xl">
                            Luxury Saunas
                            <br />
                            Inspired by Nature
                        </h1>
                        <p className="font-arsenalSC mt-6 max-w-xl text-lg leading-relaxed text-white md:text-xl">
                            Breathe deep, unwind fully, and enjoy the warmth. Discover saunas
                            designed to nurture calm, comfort, and an elevated sense of
                            wellness.
                        </p>
                        <Link
                            href="/saunas"
                            className="mt-8 inline-flex items-center rounded-sm border-2 border-amber-400 bg-transparent px-6 py-3 text-sm font-medium text-amber-400 transition-all hover:bg-amber-400 hover:text-black"
                        >
                            View Saunas
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

