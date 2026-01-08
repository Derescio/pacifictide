import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Arsenal, Arsenal_SC } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${arsenal.variable} ${arsenalSC.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
