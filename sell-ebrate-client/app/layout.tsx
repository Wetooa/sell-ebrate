import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Provider from "@/components/provider/provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sell-Ebrate",
  description: "An Ecommerce Platform for Sellers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <Provider>{children}</Provider>
      </body>
    </html >
  );
}
