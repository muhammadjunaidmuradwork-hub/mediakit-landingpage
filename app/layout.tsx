import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { siteUrl } from "./site-config";
import "./globals.css";

const sans = localFont({ src: "./fonts/dm-sans.woff2", variable: "--font-sans", display: "optional", weight: "100 900" });
const display = localFont({ src: "./fonts/fraunces.woff2", variable: "--font-display", display: "optional", weight: "100 900" });
const headline = Roboto({ subsets: ["latin"], variable: "--font-headline", display: "swap", weight: "900" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Annie Azhar | tireddesimom Media Kit", template: "%s | tireddesimom" },
  description: "The official media kit for Annie Azhar (Qurratulain), creator behind tireddesimom.",
  keywords: ["Annie Azhar", "tireddesimom", "Pakistan UGC creator", "lifestyle creator", "brand collaborations"],
  authors: [{ name: "Annie Azhar" }],
  creator: "Annie Azhar",
  category: "creator media kit",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website", locale: "en_PK", title: "Annie Azhar | tireddesimom",
    description: "Real life. Useful ideas. Seedhi Baat, No Bakwas. Explore audience, work and partnership options.",
    images: [{ url: "/og.png", width: 1733, height: 905, alt: "Annie Azhar | real life, useful ideas, Seedhi Baat, No Bakwas" }],
  },
  twitter: { card: "summary_large_image", title: "Annie Azhar | tireddesimom", description: "UGC creator · Lifestyle · Pakistan", images: ["/og.png"] },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#f5d90a", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${display.variable} ${headline.variable}`}>{children}</body></html>;
}
