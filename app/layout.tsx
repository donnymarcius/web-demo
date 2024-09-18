import type { Metadata } from "next";
import "./styles/globals.css";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: "Synbio ID",
  description: "Synbio ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
