import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import N8nChatLoader from "./components/N8nChatLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desvelo — Creative Media Agency",
  description: "NYC-based creative agency specializing in video production, filmmaking, event videography, and web design. Also operating in Chile.",
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
        {children}
        <N8nChatLoader />
      </body>
    </html>
  );
}
