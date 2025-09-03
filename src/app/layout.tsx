import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3 сентября",
  description: "🎉 Игра \"3 сентября\" - лови летающие листки календаря! 🐸",
  openGraph: {
    title: "3 сентября",
    description: "🎉 Игра \"3 сентября\" - лови летающие листки календаря! 🐸",
    type: "website",
    images: [
      {
        url: "/out.png",
        width: 1200,
        height: 630,
        alt: "3 сентября - игра",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3 сентября",
    description: "🎉 Игра \"3 сентября\" - лови летающие листки календаря! 🐸",
    images: ["/out.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
