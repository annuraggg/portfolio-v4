import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

// Fallback to system fonts
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

const zonoPro = localFont({
  // src: "../assets/fonts/ZonaPro-Bold.otf",
  src: [
    {
      path: "../assets/fonts/zonapro/zonapro-hairline.ttf",
      weight: "100",
      style: "hairline",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-thin.ttf",
      weight: "200",
      style: "thin",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-semibold.ttf",
      weight: "500",
      style: "semibold",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-bold.ttf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-extrabold.ttf",
      weight: "700",
      style: "extrabold",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-black.ttf",
      weight: "800",
      style: "black",
    },
    {
      path: "../assets/fonts/zonapro/zonapro-ultra.ttf",
      weight: "900",
      style: "ultra",
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
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
