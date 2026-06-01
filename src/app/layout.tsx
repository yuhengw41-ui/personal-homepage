import type { Metadata } from 'next';
import './globals.css';
import { profile } from '@/lib/profile';

export const metadata: Metadata = {
  metadataBase: new URL(profile.site.url),
  title: profile.site.title,
  description: profile.site.description,
  openGraph: {
    title: profile.site.title,
    description: profile.site.description,
    type: 'website',
    images: [profile.hero.image.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-warmWhite font-sans text-deepBlack antialiased transition-colors duration-700 ease-editorial dark:bg-deepBlack dark:text-warmWhite">
        {children}
      </body>
    </html>
  );
}
