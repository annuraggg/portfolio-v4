import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LeftFloatingMenu from "@/components/LeftFloatingMenu";
import MouseFollower from "@/components/MouseFollower";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zonoPro = localFont({
  // src: "../assets/fonts/ZonaPro-Bold.otf",
  src: [
    {
      path: "../assets/fonts/zonapro/zonapro-extralight.otf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-light.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-semibold.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-zona-pro",
});

export const metadata: Metadata = {
  title: "Anurag Sawant",
  description: "Full-Stack Developer | Cloud Enthusiast | DevOps Practitioner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zonoPro.variable} antialiased`}
      >
        <Navbar />
        <MouseFollower />
        <LeftFloatingMenu />
        {children}
      </body>
    </html>
  );
}
