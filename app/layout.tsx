import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://holycores.com"),
  title: "HOLYCORES｜从云端，到边缘",
  description: "HOLYCORES 构建覆盖云端、数据中心与边缘的开放 AI 计算平台。",
  icons: { icon: "/brand/logo-1.0.svg" },
  openGraph: {
    title: "HOLYCORES｜从云端，到边缘",
    description: "开放架构。极致性能。无限智能。",
    images: ["/og.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
