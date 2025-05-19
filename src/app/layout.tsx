import type { Metadata } from "next";
import {
  ClerkProvider
} from "@clerk/nextjs";
import { Geist, Geist_Mono, Questrial } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevMemo",
  description: "Tu notas de código",
};

const fontQuestrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${fontQuestrial.className} bg-[#0f0f0f] antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
