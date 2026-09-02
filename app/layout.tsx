import type { Metadata } from "next";
import { Unbounded, Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import { siteConfig } from "@/config/siteConfig";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  icons: {
    icon: "/logos/vibeesta-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${marker.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
