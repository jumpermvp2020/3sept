import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://3sept.ru'),
  title: "3 сентября - Игра по мотивам песни Шафутинского | Лови календари онлайн",
  description: "🎵 Игра '3 сентября' по мотивам песни Михаила Шафутинского!  Мем 3 сентября, я календарь перевернул мем, Шафутинский мем ! Бесплатная игра про 3 сентября с Шафутинским. Играй прямо в браузере!",
  keywords: "3 сентября, шафутинский, игра 3 сентября, календарь перевернул, михаил шафутинский, онлайн игра, бесплатная игра, игра календарь, 3 сентября игра, шафутинский игра, 3 сентября мем, мем 3 сентября, я календарь перевернул мем, шафутинский мем, 3 сентября картинки, мемы про 3 сентября, 3 сентября приколы, мемы шафутинского, третье сентября мемы, картинки 3 сентября, 3 сентября открытки прикольные, смешные картинки 3 сентября, я календарь переверну картинки",
  authors: [{ name: "3 сентября - игра" }],
  creator: "3 сентября - игра",
  publisher: "3 сентября - игра",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://3sept.ru",
  },
  openGraph: {
    title: "3 сентября - Игра по мотивам песни Шафутинского",
    description: "🎵 Игра '3 сентября' по мотивам песни Михаила Шафутинского!  Мем 3 сентября, я календарь перевернул мем, Шафутинский мем !",
    type: "website",
    locale: "ru_RU",
    siteName: "3 сентября - игра",
    url: "https://3sept.ru",
    images: [
      {
        url: "/out.png",
        width: 1200,
        height: 630,
        alt: "3 сентября - игра по мотивам песни Шафутинского",
        type: "image/png",
      },
      {
        url: "/shef.png",
        width: 300,
        height: 300,
        alt: "Михаил Шафутинский в игре 3 сентября",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3 сентября - Игра по мотивам песни Шафутинского",
    description: "🎵 Игра '3 сентября' по мотивам песни Михаила Шафутинского!  Мем 3 сентября, я календарь перевернул мем, Шафутинский мем !",
    images: ["/out.png"],
    creator: "@3septgame",
  },
  other: {
    "yandex-verification": "verification_token",
    "google-site-verification": "verification_token",
    "manifest": "/manifest.json",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Яндекс.Метрика */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104007551', 'ym');

              ym(104007551, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/104007551" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VMLREZF0K9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VMLREZF0K9');
          `}
        </Script>

        {/* Структурированные данные для SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "3 сентября - Игра по мотивам песни Шафутинского",
              "description": "Увлекательная онлайн игра по мотивам песни Михаила Шафутинского '3 сентября'. Лови летающие листки календаря в браузере!",
              "url": "https://3sept.ru",
              "applicationCategory": "Game",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "RUB"
              },
              "author": {
                "@type": "Person",
                "name": "Михаил Шафутинский"
              },
              "genre": "Arcade",
              "gamePlatform": "Web Browser",
              "screenshot": "https://3sept.ru/out.png",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
