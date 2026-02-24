import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amana Compliance — AML Compliance for Regulated Businesses",
  description:
    "We build inspection-ready AML programmes for estate agents, accountants, letting agents, and high-value dealers. Book a free 20-minute review.",
  icons: {
    icon: [
      {
        url: "/logos/company/amana-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logos/company/amana-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  other: {
    "llm-txt": "/llm.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
