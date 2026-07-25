import type { Metadata, Viewport } from "next";
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

// ─── IMPORTANT ──────────────────────────────────────────────────────────
// Change this to your real production domain after deploying to Vercel.
// All Open Graph / Twitter Card URLs are resolved against this base.
// ─────────────────────────────────────────────────────────────────────────
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hr-furniture.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HR Furniture — Premium Sofas & Living Furniture",
    template: "%s · HR Furniture",
  },
  description:
    "Crafted for beautiful living. Premium sofas designed for comfort, elegance, and timeless interiors. Hand-built by master upholsterers. Explore luxury collections and our custom sofa configurator.",
  keywords: [
    "HR Furniture",
    "luxury sofas",
    "premium furniture",
    "custom sofas",
    "living room furniture",
    "L-shape sofas",
    "sectionals",
    "recliners",
    "boucle sofa",
    "walnut furniture",
  ],
  authors: [{ name: "HR Furniture" }],
  creator: "HR Furniture",
  publisher: "HR Furniture",
  applicationName: "HR Furniture",
  category: "Furniture",
  keywordsAlt: ["sofa maker", "furniture store", "luxury interior"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/brand/favicon.ico"],
    apple: [
      { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "HR Furniture",
    title: "HR Furniture — Crafted For Beautiful Living",
    description:
      "Premium sofas designed for comfort, elegance, and timeless interiors. Hand-built by master upholsterers. Explore our luxury collections and custom sofa configurator.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HR Furniture — Crafted Living. For Beautiful Interiors.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Furniture — Crafted For Beautiful Living",
    description:
      "Premium sofas designed for comfort, elegance, and timeless interiors. Hand-built by master upholsterers.",
    images: ["/og-image.png"],
    creator: "@hrfurniture",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "theme-color": "#3E2A20",
    "msapplication-TileColor": "#3E2A20",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: "#3E2A20",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fallback icon link tags (Next.js metadata usually handles this, but extra guarantees) */}
        <link rel="icon" href="/brand/favicon.ico" sizes="any" />
        <link rel="icon" href="/brand/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/brand/favicon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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
