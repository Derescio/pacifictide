# Prisma 7 + Next.js + Neon Database Setup Guide

> **Last Updated:** January 2026  
> **Prisma Version:** 7.x  
> **Next.js Version:** 15+ / 16+  
> **Database:** Neon PostgreSQL

---

## Overview

This guide documents the step-by-step process to connect a Next.js application to a Neon PostgreSQL database using Prisma 7. Prisma 7 introduced breaking changes from Prisma 6, requiring driver adapters and a new configuration approach.

---

## Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- A Neon account with a database created
- Next.js project initialized

---

## Step 1: Install Dependencies

```bash
# Prisma CLI and Client
pnpm add @prisma/client
pnpm add -D prisma

# PostgreSQL Driver Adapter (required for Prisma 7)
pnpm add @prisma/adapter-pg pg
pnpm add -D @types/pg

# Environment variable loader
pnpm add dotenv
```

---

## Step 2: Create Prisma Schema

Create the folder and file: `prisma/schema.prisma`

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
}

// Add your models below
model User {
    id        String   @id @default(cuid())
    email     String   @unique
    role      Role     @default(USER)
    createdAt DateTime @default(now())
}

enum Role {
    ADMIN
    USER
}
```

### ⚠️ Important (Prisma 7 Breaking Change)

**Do NOT include `url` or `directUrl` in the datasource block.** These properties are no longer supported in Prisma 7 schema files.

---

## Step 3: Create Prisma Config

Create file: `prisma.config.ts` (in project root)

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

---

## Step 4: Configure Environment Variables

Create or update `.env` file in project root:

```env
# Neon Database Connection String
# Get this from: Neon Dashboard → Your Project → Connection Details
DATABASE_URL="postgresql://username:password@ep-cool-name-123456.region.aws.neon.tech/neondb?sslmode=require"
```

### Finding Your Neon Connection String

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Click "Connection Details"
4. Copy the connection string (use the direct connection, not pooled, for migrations)

---

## Step 5: Create Prisma Client Singleton

Create file: `lib/prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

### Why This Pattern?

- **Driver Adapter:** Prisma 7 requires explicit connection handling via adapters
- **Global Singleton:** Prevents multiple PrismaClient instances in development (hot reload creates new instances)
- **Production Safety:** Only caches client in development mode

---

## Step 6: Generate Prisma Client & Push Schema

```bash
# Generate the Prisma Client
pnpm prisma generate

# Push schema to database (development - no migration history)
pnpm prisma db push

# OR create a migration (production - with migration history)
pnpm prisma migrate dev --name init
```

---

## Step 7: Test the Connection

Create an API route: `app/api/db-test/route.ts`

```typescript
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();

    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
```

Visit `http://localhost:3000/api/db-test` to verify the connection.

---

## Common Commands Reference

| Command                                  | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `pnpm prisma generate`                   | Generate Prisma Client from schema      |
| `pnpm prisma db push`                    | Push schema changes to DB (no migration)|
| `pnpm prisma migrate dev --name <name>`  | Create and apply migration              |
| `pnpm prisma migrate deploy`             | Apply pending migrations (production)   |
| `pnpm prisma studio`                     | Open visual database browser            |
| `pnpm prisma migrate reset`              | Reset DB and reapply all migrations     |

---

## Project Structure

```
your-project/
├── .env                    # Database URL (gitignored)
├── prisma.config.ts        # Prisma configuration
├── prisma/
│   ├── schema.prisma       # Database schema & models
│   └── migrations/         # Migration history
├── lib/
│   └── prisma.ts           # PrismaClient singleton
└── app/
    └── api/
        └── db-test/
            └── route.ts    # Test endpoint
```

---

## Troubleshooting

### Error: `url` is no longer supported in schema files

**Cause:** Prisma 7 breaking change  
**Fix:** Remove `url` and `directUrl` from `schema.prisma`, use `prisma.config.ts` instead

### Error: `PrismaClient` needs non-empty options

**Cause:** Prisma 7 requires a driver adapter when URL isn't in schema  
**Fix:** Install `@prisma/adapter-pg` and configure in `lib/prisma.ts`

### Error: Can't reach database server at localhost

**Cause:** `.env` has wrong URL or localhost placeholder  
**Fix:** Update `DATABASE_URL` with actual Neon connection string

### Error: `directUrl` does not exist in type

**Cause:** `directUrl` not supported in `prisma.config.ts`  
**Fix:** Remove `directUrl`, only use `url`

---

## Key Differences: Prisma 6 vs Prisma 7

| Feature                  | Prisma 6              | Prisma 7                              |
| ------------------------ | --------------------- | ------------------------------------- |
| Database URL location    | `schema.prisma`       | `prisma.config.ts`                    |
| `directUrl` support      | In schema             | Not supported                         |
| PrismaClient init        | `new PrismaClient()`  | Requires `adapter` option             |
| Driver adapters          | Optional              | Required (when URL not in schema)     |

---

## Resources

- [Prisma 7 Migration Guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
- [Prisma + Neon Documentation](https://neon.tech/docs/guides/prisma)
- [Prisma Driver Adapters](https://www.prisma.io/docs/orm/overview/databases/database-drivers)
- [Neon Console](https://console.neon.tech)

