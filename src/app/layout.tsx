import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import SmoothScroll from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import { isFilled } from "@prismicio/client";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  src: "./gambarino.woff2",
  display: "swap",
  variable: "--font-gambarino",
});

export async function generateMetdata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Côte Royale Paris",
    description:
      settings.data.meta_description ||
      "Discover the exquisite collection of luxury fragrances by Côte Royale Paris",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${raleway.variable} ${gambarino.variable} antialiased`}
      >
        <SmoothScroll>
          <body className="bg-neutral-900 text-white">
            <NavBar settings={settings} />
            <main className="pt-14 md:pt-16">{children}</main>
            <Footer />
          </body>
        </SmoothScroll>
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}
