import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://holycores.com"),
  title: "HOLYCORES｜算力，生而自由",
  description: "HOLYCORES 构建面向下一代人工智能的高性能计算平台。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "HOLYCORES｜算力，生而自由",
    description: "开放架构。极致性能。无限智能。",
    images: ["/og.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
