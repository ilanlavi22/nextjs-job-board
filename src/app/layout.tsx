import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Flow Jobs",
    template: "%s | Flow Jobs",
  },
  description: "Find your dream developer job.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
