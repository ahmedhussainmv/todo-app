import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RegisterSW } from "@/app/RegisterSW";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo",
  description: "A simple todo app for your web browser.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Todo",
  },
  icons: {
    apple: "/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-wodth",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors />
        <div className="max-h-dvh max-w-dvw">
          {children}
          <RegisterSW />
        </div>
      </body>
    </html>
  );
}
