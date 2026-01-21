"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserNavProps {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role: string;
    } | null;
}

export function UserNav({ user }: UserNavProps) {
    if (!user) {
        return (
            <div className="flex gap-2">
                <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                    <Button>Sign Up</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="space-y-1">
                <h3 className="font-semibold">Session Details</h3>
                <div className="text-sm text-muted-foreground">
                    <p><span className="font-medium">ID:</span> {user.id}</p>
                    <p><span className="font-medium">Name:</span> {user.name || "Not set"}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Role:</span> {user.role}</p>
                </div>
            </div>
            <Button onClick={() => signOut({ callbackUrl: "/login" })} variant="outline">
                Sign Out
            </Button>
        </div>
    );
}

