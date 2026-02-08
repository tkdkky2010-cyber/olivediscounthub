import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/config';
import { Geist, Geist_Mono } from "next/font/google";
import TopBanner from "@/components/TopBanner"; // Promotion Banner
import Header from "@/components/stitch/Header"; // Stitch Layout Header
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { SearchProvider } from '@/context/SearchContext';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <CurrencyProvider>
              <ToastProvider>
                <SearchProvider>
                  <TopBanner />
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                </SearchProvider>
              </ToastProvider>
            </CurrencyProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
