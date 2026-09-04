import type { Metadata } from "next";
import {
  Bangers,
  Press_Start_2P,
  Rubik_Wet_Paint,
  JetBrains_Mono,
  Comic_Neue,
} from "next/font/google";
import "./globals.css";

const display = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const wet = Rubik_Wet_Paint({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wet",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const body = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wild-ometer.local";

export const metadata: Metadata = {
  title: "★ WILD-O-METER ★ — How wild is Min?!!",
  description:
    "Live wild-level tracker for @minchoi. Huge mutated portrait, stage timeline 0→8, and recent wild sightings from X. Not affiliated. Built for fun. CARNIVAL CYBERPUNK TRASH ENERGY.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "★ WILD-O-METER ★ — WILD LEVEL LOCKED IN!!!",
    description:
      "Bold neon mutation meter. Current wild portrait, stages 0→8, and wild sightings. Tracking @minchoi · built for fun.",
    images: [
      {
        url: "/min-wild-current.png",
        width: 1024,
        height: 1024,
        alt: "Current MAXIMUM WILD mutated portrait",
      },
    ],
    type: "website",
    siteName: "Wild-O-Meter",
  },
  twitter: {
    card: "summary_large_image",
    title: "★ WILD-O-METER ★",
    description: "How wild is it getting out here? Check the meter. 🔥🎰✨",
    images: ["/min-wild-current.png"],
    creator: "@minchoi",
  },
  icons: {
    icon: "/min-wild-8.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${mono.variable} ${display.variable} ${pixel.variable} ${wet.variable}`}
    >
      <body className="noise-bg scanlines vhs-flicker font-body antialiased">
        {children}
      </body>
    </html>
  );
}
