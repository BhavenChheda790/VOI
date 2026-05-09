import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Voice of India (VOI) — USA",
    template: "%s | Voice of India (VOI)",
  },
  description:
    "California not-for-profit celebrating Indian culture while empowering women entrepreneurs, start-ups, and students through mentorship and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`}>
      <body
        className={`${sans.className} voi-page-bg min-h-full flex flex-col text-stone-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
