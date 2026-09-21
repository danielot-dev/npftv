import type { Metadata } from "next";
import { Montserrat, Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

// This entire site is database-driven and content changes via the admin
// dashboard need to appear immediately — so every page renders per-request
// rather than being frozen into a static snapshot at build time. This also
// avoids the build itself firing dozens of concurrent DB queries at once,
// which can exceed Supabase's connection pool limit.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://npftv.net"),
  title: {
    default: "NPF TV | Nigeria Police Force Television",
    template: "%s | NPF TV",
  },
  description:
    "The official media platform of the Nigeria Police Force — live TV, news, press releases, programs, and official updates.",
  keywords: [
    "Nigeria Police Force",
    "NPF TV",
    "Nigeria Police news",
    "Nigeria Police live TV",
  ],
  openGraph: {
    title: "NPF TV | Nigeria Police Force Television",
    description:
      "The official media platform of the Nigeria Police Force — live TV, news, press releases, programs, and official updates.",
    url: "https://npftv.net",
    siteName: "NPF TV",
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${condensed.variable}`}>
      <body className="font-body bg-white text-navy-dark antialiased">
        {children}
      </body>
    </html>
  );
}
