# Authentication Setup Guide

> **Last Updated:** January 2026  
> **NextAuth Version:** 5.0.0-beta.30 (Auth.js)  
> **Next.js Version:** 16.1.1  
> **UI Components:** shadcn/ui blocks

---

## Overview

This document details the authentication implementation for PacificTide using NextAuth v5 (Auth.js) with:

- **Credentials Provider** - Email/password authentication
- **Google Provider** - OAuth sign-in (configured, ready for use)
- **Prisma Adapter** - Database session storage
- **JWT Strategy** - Token-based sessions

---

## Dependencies Installed

```bash
pnpm add next-auth@beta @auth/prisma-adapter bcryptjs
pnpm add -D @types/bcryptjs
```

| Package | Purpose |
|---------|---------|
| `next-auth@beta` | Auth.js v5 for Next.js 15+ |
| `@auth/prisma-adapter` | Connects NextAuth to Prisma/database |
| `bcryptjs` | Password hashing |

---

## Project Structure

```
pacifictide/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts        # NextAuth API handler
│   │       └── register/
│   │           └── route.ts        # User registration endpoint
│   ├── login/
│   │   └── page.tsx                # Login page (shadcn block)
│   ├── signup/
│   │   └── page.tsx                # Signup page (shadcn block)
│   └── layout.tsx                  # Root layout with Providers
├── components/
│   ├── login-form.tsx              # Login form component (shadcn block)
│   ├── signup-form.tsx             # Signup form component (shadcn block)
│   ├── user-nav.tsx                # User session display + sign out
│   └── providers.tsx               # SessionProvider wrapper
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   └── auth.utils.ts               # Auth helper functions
├── types/
│   └── next-auth.d.ts              # TypeScript type extensions
└── prisma/
    └── schema.prisma               # User, Account, Session models
```

---

## Database Schema (Prisma)

The following models were added for NextAuth:

```prisma
model User {
    id            String    @id @default(cuid())
    name          String?
    email         String    @unique
    emailVerified DateTime?
    image         String?
    password      String?   // For credentials provider (hashed)
    role          Role      @default(USER)
    createdAt     DateTime  @default(now())
    updatedAt     DateTime  @updatedAt

    accounts Account[]
    sessions Session[]
}

model Account {
    id                String  @id @default(cuid())
    userId            String
    type              String
    provider          String
    providerAccountId String
    refresh_token     String? @db.Text
    access_token      String? @db.Text
    expires_at        Int?
    token_type        String?
    scope             String?
    id_token          String? @db.Text
    session_state     String?

    user User @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@unique([provider, providerAccountId])
}

model Session {
    id           String   @id @default(cuid())
    sessionToken String   @unique
    userId       String
    expires      DateTime

    user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
    identifier String
    token      String   @unique
    expires    DateTime

    @@unique([identifier, token])
}

enum Role {
    ADMIN
    USER
}
```

---

## Configuration Files

### `lib/auth.ts` - NextAuth Configuration

```typescript
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import type { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      // Email/password authentication
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // Add user id and role to token
    },
    session({ session, token }) {
      // Add id and role to session.user
    },
  },
});
```

### `lib/auth.utils.ts` - Helper Functions

| Function | Description |
|----------|-------------|
| `hashPassword(password)` | Hash password with bcrypt (12 rounds) |
| `verifyPassword(password, hash)` | Compare password against hash |
| `createUser({ email, password, name })` | Create new user with hashed password |
| `getUserByEmail(email)` | Fetch user by email |

### `types/next-auth.d.ts` - Type Extensions

Extends NextAuth types to include custom `role` field:

```typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}
```

---

## UI Components (shadcn/ui Blocks)

### Login Form (`components/login-form.tsx`)

Based on shadcn/ui login block with additions:

- Form state management with `useState`
- Credentials login via `signIn("credentials", { ... })`
- Google sign-in button via `signIn("google")`
- Error display for invalid credentials
- Loading states during authentication
- Link to signup page

### Signup Form (`components/signup-form.tsx`)

Based on shadcn/ui signup block with additions:

- Form state for name, email, password, confirmPassword
- Client-side validation (password match, length)
- Registration via `/api/auth/register` endpoint
- Auto sign-in after successful registration
- Google sign-up button
- Link to login page

### User Nav (`components/user-nav.tsx`)

Displays authenticated user session:

- Shows user ID, name, email, role
- Sign Out button using `signOut()` from `next-auth/react`
- Sign In / Sign Up links when not authenticated

### Providers (`components/providers.tsx`)

Wraps app with `SessionProvider` for client-side auth:

```typescript
"use client";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

---

## API Routes

### `POST /api/auth/register`

Creates a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "cuid...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

**Errors:**
- `400` - Missing email/password or password < 8 chars
- `409` - User already exists

### `GET/POST /api/auth/[...nextauth]`

NextAuth API routes (handled automatically):

- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signin/:provider` - Initiate sign in
- `GET /api/auth/signout` - Sign out page
- `POST /api/auth/signout` - Sign out action
- `GET /api/auth/session` - Get session
- `GET /api/auth/providers` - List providers
- `GET /api/auth/csrf` - CSRF token
- `GET /api/auth/callback/:provider` - OAuth callback

---

## Environment Variables

```env
# Required
AUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth (optional - for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Generate AUTH_SECRET

```bash
# Linux/Mac
openssl rand -base64 32

# PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env`

---

## Usage Examples

### Server-Side Session Check

```typescript
import { auth } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

### Client-Side Session Access

```typescript
"use client";
import { useSession } from "next-auth/react";

export function UserProfile() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not signed in</div>;
  
  return <div>Signed in as {session.user.email}</div>;
}
```

### Client-Side Sign Out

```typescript
"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })}>
      Sign Out
    </button>
  );
}
```

### Protecting API Routes

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // User is authenticated
  return NextResponse.json({ user: session.user });
}
```

### Role-Based Access

```typescript
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth();
  
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }
  
  return <div>Admin Dashboard</div>;
}
```

---

## Authentication Flow

### Credentials Login

```
1. User enters email/password on /login
2. Form submits to signIn("credentials", { email, password })
3. NextAuth calls authorize() in Credentials provider
4. authorize() checks password with bcrypt
5. If valid, JWT token created with user data
6. User redirected to home page
```

### Google OAuth Login

```
1. User clicks "Login with Google"
2. signIn("google") redirects to Google
3. User authorizes app
4. Google redirects to /api/auth/callback/google
5. NextAuth creates/links Account in database
6. JWT token created
7. User redirected to home page
```

### Registration

```
1. User fills signup form
2. Form POST to /api/auth/register
3. Server validates and hashes password
4. User created in database
5. Auto sign-in via signIn("credentials")
6. User redirected to home page
```

---

## Troubleshooting

### "Adapter type mismatch" Error

**Fix:** Cast the adapter in `lib/auth.ts`:
```typescript
adapter: PrismaAdapter(prisma) as Adapter,
```

### "PrismaClient needs non-empty options" Error

**Cause:** Prisma 7 requires driver adapter  
**Fix:** Use `@prisma/adapter-pg` in `lib/prisma.ts`

### Session is null after login

**Check:**
1. `AUTH_SECRET` is set in `.env`
2. `Providers` wraps your app in `layout.tsx`
3. Cookies are enabled in browser

### Google sign-in not working

**Check:**
1. `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
2. Callback URL configured in Google Console
3. App is running on correct URL (localhost:3000)

---

## Resources

- [NextAuth.js Documentation](https://authjs.dev/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [shadcn/ui Blocks](https://ui.shadcn.com/blocks)
- [Google OAuth Setup](https://console.cloud.google.com/apis/credentials)

