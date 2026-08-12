import type { Metadata } from "next";
import { GlobalScrollMotion } from "./components/GlobalScrollMotion";
import { PrivacyCenter } from "./components/PrivacyCenter";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const configuredUrl = process.env.PUBLIC_SITE_URL?.trim();
  const origin = configuredUrl && /^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(configuredUrl)
    ? configuredUrl.replace(/\/$/, "")
    : "https://multbilim-studio-demo.nosirbekxakimov01.chatgpt.site";
  const title = "MultBilim — Animation Studio";
  const description =
    "O‘zbekistonda yaratilgan olamlar. MultBilim animatsiya studiyasining original loyihalari va xizmatlari.";

  return {
    title,
    description,
    metadataBase: new URL(origin),
    alternates: { canonical: "/" },
    icons: {
      icon: "/media/multbilim-logo.png",
      shortcut: "/media/multbilim-logo.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "uz_UZ",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "MultBilim — O‘zbekistonda yaratilgan olamlar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('multbilim-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`,
          }}
        />
      </head>
      <body><GlobalScrollMotion />{children}<PrivacyCenter /></body>
    </html>
  );
}
