import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "상담사 평가 대시보드 | HR Management",
  description: "상담사 인사평가, 역량진단, 성과평가를 위한 통합 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
