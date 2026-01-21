"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavAuth } from "@/components/Auth/nav-auth";
import { MobileNav } from "@/components/shared/mobile-nav";
import { AnimatePresence, motion } from "motion/react";

// Sauna subcategories for dropdown
export const saunaCategories = [
    { href: "/saunas/cube", label: "Cube" },
    { href: "/saunas/barrel", label: "Barrel" },
    { href: "/saunas/indoor", label: "Indoor" },
    { href: "/saunas/outdoorshowers", label: "Outdoor Showers" }
];

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/saunas", label: "Saunas", hasDropdown: true },
    { href: "/heaters", label: "Heaters" },
    { href: "/saunas/outdoor", label: "Hot and Cold Plunge" },
    // { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
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
    const [isSaunasOpen, setIsSaunasOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsSaunasOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsSaunasOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsSaunasOpen(false);
        }, 150);
    };

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
                <div className="absolute inset-0 bg-black/60 md:bg-black/60" />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="flex items-center justify-between px-6 py-2 md:px-10 lg:px-12">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/images/White Transparent.png"
                            // src="/images/White 2.png"
                            alt="Pacific Tide"
                            width={0}
                            height={0}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 33vw"
                            className="h-48 w-auto md:h-48 lg:h-[140px] ml-[-8px]"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 lg:flex lg:mt-[-10px]">
                        {navLinks.map((link) => (
                            <div key={link.href} className="relative">
                                {link.hasDropdown ? (
                                    // Saunas with dropdown
                                    <div
                                        ref={dropdownRef}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button
                                            className="group flex items-center gap-1 text-md font-medium font-arsenal text-white/90 transition-colors hover:text-white"
                                            onClick={() => setIsSaunasOpen(!isSaunasOpen)}
                                        >
                                            {link.label}
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                                animate={{ rotate: isSaunasOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                />
                                            </motion.svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {isSaunasOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2"
                                                >
                                                    {/* Arrow */}
                                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                                                        <div className="h-3 w-3 rotate-45 border-l border-t border-white/20 bg-black/90 backdrop-blur-xl" />
                                                    </div>

                                                    <div className="min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-xl">
                                                        {/* View All Saunas Link */}
                                                        <Link
                                                            href="/saunas"
                                                            onClick={() => setIsSaunasOpen(false)}
                                                            className="flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-white/10"
                                                        >
                                                            View All Saunas
                                                        </Link>

                                                        <div className="my-1 border-t border-white/10" />

                                                        {/* Category Links */}
                                                        {saunaCategories.map((category, index) => (
                                                            <motion.div
                                                                key={category.href}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.03 }}
                                                            >
                                                                <Link
                                                                    href={category.href}
                                                                    onClick={() => setIsSaunasOpen(false)}
                                                                    className="flex items-center rounded-lg px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                                                >
                                                                    {category.label}
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    // Regular nav link
                                    <Link
                                        href={link.href}
                                        className="text-md font-medium font-arsenal text-white/90 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Auth / Avatar */}
                    <div className="flex items-center gap-4 ">
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
                        <p className="font-geistMono mt-6 max-w-xl text-lg leading-relaxed text-white md:text-xl">
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
