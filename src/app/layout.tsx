import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {Header} from "@/components/Header/Header";
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Test Market',
  description: 'Test Market Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-3.5 pt-3 pb-56 sm:pt-14 sm:pb-96`}>
        <Providers>
        <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
} 