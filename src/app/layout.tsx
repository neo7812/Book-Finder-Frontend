// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Finder",
  description: "Discover millions of books with Google Books API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-base-200 text-base-content`}
      >
        {children}
      </body>
    </html>
  );
}