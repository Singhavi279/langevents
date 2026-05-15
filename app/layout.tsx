import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-cursive' });

const SITE_URL = "https://timeslanguages.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Times Internet Languages Live Events | India's Premium Vernacular Event Portfolio",
    template: "%s · Times Internet Languages Live"
  },
  description:
    "Discover Times Internet Languages Live - a premium portfolio of education, healthcare, lifestyle & entertainment and partner-led event IPs across Indian cities, languages and high-intent communities.",
  applicationName: "Times Internet Languages Live Events",
  keywords: [
    "Times Internet Languages Live",
    "Times Internet events",
    "India events 2026",
    "vernacular events India",
    "Hindi events",
    "career counselling India",
    "study abroad conclave",
    "maternity expo India",
    "comedy talent hunt India",
    "brand sponsorship India",
    "education events Delhi Mumbai",
    "lifestyle & entertainment events India"
  ],
  authors: [{ name: "Times Internet" }],
  creator: "Times Internet",
  publisher: "Times Internet",
  category: "Events",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "hi-IN": `${SITE_URL}/hi`
    }
  },
  openGraph: {
    title: "Times Internet Languages Live Events | India's Premium Vernacular Event Portfolio",
    description:
      "A premium portfolio of education, healthcare, lifestyle & entertainment and partnership-led events from Times Internet - built for India's vernacular-first audiences.",
    url: SITE_URL,
    siteName: "Times Internet Languages Live",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/8199169/pexels-photo-8199169.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Times Internet Languages Live - India's Premium Event Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Times Internet Languages Live Events",
    description:
      "Premium, vernacular-first event IPs across Education, Healthcare and Lifestyle & Entertainment - by Times Internet.",
    site: "@timesinternet",
    creator: "@timesinternet",
    images: [
      "https://images.pexels.com/photos/8199169/pexels-photo-8199169.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "New Delhi, India",
    "geo.position": "28.6139;77.2090",
    ICBM: "28.6139, 77.2090",
    "format-detection": "telephone=no"
  }
};

export const viewport: Viewport = {
  themeColor: "#f7f5ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  );
}
