"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/saunas", label: "Saunas" },
    { href: "/heaters", label: "Heaters" },
    { href: "/plunge", label: "Hot and Cold Plunge" },
    { href: "/about", label: "About" },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 lg:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
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
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="menu"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
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
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute left-4 right-4 top-20 z-50 overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl lg:hidden"
                        >
                            <nav className="flex flex-col p-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Divider */}
                                <div className="my-2 border-t border-white/10" />

                                {/* Auth Links for Mobile */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                                    className="flex gap-2 px-4 py-3"
                                >
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/20"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-medium text-black transition-colors hover:bg-white/90"
                                    >
                                        Sign Up
                                    </Link>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

