import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StarHub | Your GitHub Stars, Organized",
  description: "A professional-grade organizer for your GitHub stars. Search, filter, and export your curated library with zero friction.",
  keywords: ["GitHub", "stars", "repositories", "developer tools", "analysis", "dashboard"],
  authors: [{ name: "StarHub" }],
  openGraph: {
    title: "StarHub | Your GitHub Stars, Organized",
    description: "Scan, categorize, and analyze your GitHub starred repositories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StarHub | Your GitHub Stars, Organized",
    description: "Scan, categorize, and analyze your GitHub starred repositories",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
