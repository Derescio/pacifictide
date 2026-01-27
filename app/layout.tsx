import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Geist, Geist_Mono, Playfair_Display, Arsenal, Arsenal_SC } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Hero } from "@/components/shared/hero";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const arsenal = Arsenal({
  variable: "--font-arsenal",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const arsenalSC = Arsenal_SC({
  variable: "--font-arsenal-sc",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pacific Tide",
  description: "Luxury saunas inspired by nature",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${arsenal.variable} ${arsenalSC.variable} antialiased`}
        >
          <div className="px-1 pt-1">
            <Hero user={session?.user ?? null} />
          </div>
          <Providers>{children}</Providers>
          <Footer />
          <Toaster
            position="top-center"
            richColors
            duration={2000}
            theme="light"
            style={{
              background: "#f0f0f0",
              color: "#333",
            }}
          />
        </body>
      </html>
    );
  }
}