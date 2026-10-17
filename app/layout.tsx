import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const display = Fredoka({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Absolute base for OG/Twitter image URLs. Falls back to the production
// domain Vercel exposes at build time, so share cards work without extra config.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Wild-O-Meter — How wild is Min?!",
  description:
    "Live wild-level tracker for @minchoi. Every time Min says “wild”, the meter climbs and his portrait mutates. Not affiliated. Built for fun.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Wild-O-Meter — How wild is Min?!",
    description:
      "Every “wild” counts. Watch the meter climb toward 1000 and Min's portrait mutate. Tracking @minchoi · built for fun.",
    images: [
      {
        url: "/min-wild-current.jpg",
        width: 1024,
        height: 1024,
        alt: "Min's current wild portrait",
      },
    ],
    type: "website",
    siteName: "Wild-O-Meter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild-O-Meter",
    description: "How wild is it getting out here? Check the meter. 🔥",
    images: ["/min-wild-current.jpg"],
    creator: "@minchoi",
  },
  icons: {
    icon: "/min-wild-8.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
