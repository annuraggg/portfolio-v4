import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import LogRocket from "logrocket";
import ReactLenis from "lenis/react";
import Scripts from "./Scripts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Fallback to system fonts
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

const zonoPro = localFont({
  src: [
    {
      path: "../assets/fonts/zonapro/zonapro-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-semibold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-extrabold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zona-pro",
  display: "swap",
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
  LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_ID as string);
  LogRocket.identify(
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zonoPro.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactLenis root>{children}</ReactLenis>
          <Toaster position="bottom-right" />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
