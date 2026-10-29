import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Preloader } from "./components/Preloader";
import { Providers } from "./components/Providers";
import { SmoothScroll } from "./components/SmoothScroll";
import { site } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hiram Forges | Fire, skill, lasting tools.",
    template: "%s | Hiram Forges",
  },
  description: site.oneLiner,
  applicationName: site.name,
  keywords: [
    "blacksmith directory",
    "welders",
    "metal fabricators",
    "artisan directory Africa",
    "tool repair",
    "forge",
    "commission metalwork",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Hiram Forges | Fire, skill, lasting tools.",
    description: site.oneLiner,
    url: site.url,
    locale: "en_KE",
    images: [{ url: "/images/hero-01.jpg", width: 1920, height: 1100, alt: "Blacksmith forging hot metal on an anvil" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiram Forges | Fire, skill, lasting tools.",
    description: site.oneLiner,
    images: ["/images/hero-01.jpg"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#f3cf2d",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Rajdhani:300,400,500,600,700|Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Raleway:100,400,600,700,900|Lato:400,700,900&display=swap"
        />
      </head>
      <body className="main-layout">
        <Providers locale="en">
          <a className="hf-skip" href="#main">
            Skip to content
          </a>
          <Preloader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
          <CookieConsent />
          <SmoothScroll />
        </Providers>
      </body>
    </html>
  );
}
