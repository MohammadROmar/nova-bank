import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'NovaBank - Advanced Bancking Management System',
    template: '%s - NovaBank',
  },
  description:
    'A modern, secure, and modular banking system designed to manage accounts, process transactions, track financial activity, and support administrative operations.',
};

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        dir="ltr"
        className={`${inter.variable} bg-background font-inter selection:bg-primary antialiased selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
