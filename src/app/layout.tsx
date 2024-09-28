import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"; // Import global styles
import DarkModeToggle from "./components/DarkModeToggle";
import Image from "next/image"; // Import Next.js Image component

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for SEO
export const metadata: Metadata = {
  title: "FoodFacts",
  description: "Explore various food products!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {/* Header container with flex */}
        <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
          {/* Centered Logo and Site Title Container */}
          <div className="flex items-center mx-auto">
            {/* Logo Image */}
            <Image
              src="/FoodFacts.svg"
              alt="FoodFacts Logo"
              width={50}
              height={50}
              className="mr-1"
            />
            {/* Site Name */}
            <h1
              className={`ml-1 text-3xl font-black italic ${geistMono.variable} text-black-600 dark:text-gray-200`}
            >
              FoodFacts
            </h1>
          </div>

          {/* Dark Mode Toggle on the right */}
          <DarkModeToggle />
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
