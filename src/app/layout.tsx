import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CursorGlow } from "@/components/site/cursor-glow";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HR Furniture — Premium Sofas & Living Furniture",
  description:
    "Premium sofas designed for comfort, elegance, and timeless interiors. Explore our luxury collections, custom sofa builder, and craftsmanship at HR Furniture.",
  keywords: [
    "HR Furniture",
    "luxury sofas",
    "premium furniture",
    "custom sofas",
    "living room furniture",
    "L-shape sofas",
    "sectionals",
    "recliners",
  ],
  authors: [{ name: "HR Furniture" }],
  openGraph: {
    title: "HR Furniture — Premium Sofas & Living Furniture",
    description:
      "Crafted for beautiful living. Premium sofas designed for comfort, elegance, and timeless interiors.",
    siteName: "HR Furniture",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Furniture — Premium Sofas & Living Furniture",
    description:
      "Crafted for beautiful living. Premium sofas designed for comfort, elegance, and timeless interiors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        <SmoothScrollProvider>
          <CursorGlow />
          {children}
        </SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  );
}
