'use client';

import { SessionProvider } from 'next-auth/react';
import Header from '@/app/components/Header.js';
import Footer from '@/app/components/Footer';
import './styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
