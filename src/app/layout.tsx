import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://memory.store"),
  title: {
    default: "memory.store - Your personal memory layer",
    template: "%s | memory.store",
  },
  description:
    "Memory for your entire stack. Sync conversations, snippets, and decisions across your team's tools.",
  keywords: [
    "memory store",
    "AI memory",
    "context sync",
    "knowledge management",
    "team collaboration",
    "Raycast integration",
    "Cursor integration",
    "Claude integration",
  ],
  authors: [{ name: "memory.store" }],
  creator: "memory.store",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://memory.store",
    siteName: "memory.store",
    title: "memory.store - Your personal memory layer",
    description:
      "Memory for your entire stack. Sync conversations, snippets, and decisions across your team's tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "memory.store - Your personal memory layer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "memory.store - Your personal memory layer",
    description:
      "Memory for your entire stack. Sync conversations, snippets, and decisions across your team's tools.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonPro.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#ece9e2] text-black antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
