import type { Metadata } from "next";
import { headers } from "next/headers";
import { GlobalScrollMotion } from "./components/GlobalScrollMotion";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "MultBilim — Animation Studio";
  const description =
    "O‘zbekistonda yaratilgan olamlar. MultBilim animatsiya studiyasining original loyihalari va xizmatlari.";

  return {
    title,
    description,
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
      <body><GlobalScrollMotion />{children}</body>
    </html>
  );
}
