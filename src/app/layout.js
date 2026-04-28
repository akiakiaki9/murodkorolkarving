import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles/globals.css";

export const metadata = {
  title: 'Murod Korol Karving | Свадьбы, банкеты, прокат посуды в Бухаре',
  description: '25 лет опыта. Организация свадеб, банкетов, прокат посуды под ключ. Ансамбль, накрытие столов — всё включено в Бухаре.',
  keywords: 'свадьба Бухара, банкет Бухара, прокат посуды, карвинг, кейтеринг, Murod Korol Karving, организация свадеб, фруктовый карвинг, Бухара свадьба',
  authors: [{ name: 'Murod Korol Karving' }],
  creator: 'Akbar Soft',
  publisher: 'Murod Korol Karving',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Murod Korol Karving | Свадьбы, банкеты, прокат посуды в Бухаре',
    description: '25 лет опыта. Организация свадеб, банкетов, прокат посуды под ключ. Ансамбль, накрытие столов — всё включено в Бухаре.',
    url: 'https://murod-karving.uz',
    siteName: 'Murod Korol Karving',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Murod Korol Karving - Свадьбы, банкеты, карвинг в Бухаре',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murod Korol Karving | Свадьбы, банкеты, прокат посуды в Бухаре',
    description: '25 лет опыта. Организация свадеб, банкетов, прокат посуды под ключ в Бухаре.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: 'any' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#f5c518' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'ваш-google-verification-код', // Добавь свой код верификации
    yandex: 'ваш-yandex-verification-код', // Добавь свой код верификации
  },
  category: 'event services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#f5c518" />
        <meta name="msapplication-TileColor" content="#f5c518" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        <link rel="canonical" href="https://murod-karving.uz" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        
      </body>
    </html>
  );
}