import type { Metadata } from 'next'
import '@/styles/index.css'

export const metadata: Metadata = {
  title: 'Feple Dashboard',
  description: '상담사 평가 관리 시스템',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
