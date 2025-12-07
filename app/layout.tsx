import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";

const tiroBangla = Tiro_Bangla({
  weight: "400",
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "Dressy World",
  description: "A leading clothing e-commerce site in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tiroBangla.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}