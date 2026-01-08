"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavAuthProps {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role: string;
    } | null;
}

export function NavAuth({ user }: NavAuthProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/login"
                    className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:inline-flex"
                >
                    Sign In
                </Link>
                <Link
                    href="/signup"
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/20 ring-2 ring-white/30 transition-all hover:ring-white/50"
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={user.name || "User avatar"}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-sm font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase() ||
                            user.email?.charAt(0).toUpperCase() ||
                            "U"}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-white/10 bg-black/90 p-2 shadow-xl backdrop-blur-md">
                        <div className="border-b border-white/10 px-3 py-2">
                            <p className="text-sm font-medium text-white">
                                {user.name || "User"}
                            </p>
                            <p className="text-xs text-white/60">{user.email}</p>
                        </div>

                        <div className="py-1">
                            <Link
                                href="/account"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mr-2 h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                                Account
                            </Link>

                            {user.role === "ADMIN" && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="mr-2 h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                        />
                                    </svg>
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>

                        <div className="border-t border-white/10 pt-1">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut({ callbackUrl: "/" });
                                }}
                                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mr-2 h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                    />
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

