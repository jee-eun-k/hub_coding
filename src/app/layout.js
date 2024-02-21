"use client";

import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </RecoilRoot>
  );
}
