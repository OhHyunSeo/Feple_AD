import type { Metadata, Viewport } from "next";
import "@/styles/index.css";
import { AnalysisResultProvider } from "@/context/AnalysisResultContext";
import { SidebarProvider } from "@/context/SidebarContext";

export const metadata: Metadata = {
  title: "Feple Dashboard",
  description: "상담사 평가 관리 시스템",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white font-sans antialiased text-sm">
        <SidebarProvider>
          <AnalysisResultProvider>{children}</AnalysisResultProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
