import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GenForge — AI Tools for Small Business",
    template: "%s | GenForge",
  },
  description:
    "Free and pro AI-powered business tools for entrepreneurs. Generate taglines, business names, marketing copy and more — instantly.",
  keywords: [
    "AI business tools",
    "free business tools",
    "tagline generator",
    "business name generator",
    "AI marketing tools",
    "small business tools",
    "GenForge",
  ],
  authors: [{ name: "GenForge", url: "https://trygenforge.com" }],
  creator: "GenForge",
  metadataBase: new URL("https://trygenforge.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://trygenforge.com",
    siteName: "GenForge",
    title: "GenForge — AI Tools for Small Business",
    description:
      "Free and pro AI-powered business tools for entrepreneurs. Generate taglines, business names, marketing copy and more — instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenForge — AI Tools for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GenForge — AI Tools for Small Business",
    description:
      "Free and pro AI-powered business tools for entrepreneurs. Generate taglines, business names, marketing copy and more — instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "z-mqrc5TIZzsaLg7GCGwEhdpeWOhEH0MJ25v9Yk4yDE",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}