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
