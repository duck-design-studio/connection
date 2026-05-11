import Script from "next/script";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { getPayload } from "payload";
import config from "@payload-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PromoSidePopup } from "@/components/shared/PromoSidePopup";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const boska = localFont({
  src: [
    { path: "../fonts/Boska-Variable.woff2", style: "normal" },
    { path: "../fonts/Boska-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-boska",
  display: "swap",
});

const justSans = localFont({
  src: [
    { path: "../fonts/JustSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/JustSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/JustSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/JustSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/JustSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-just-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Connection Experience",
  description: "O Connection Experience é uma solução inovadora de conteúdo, networking e experiências especializado no mercado de turismo. Um modelo de evento híbrido com programação diferenciada, trazendo as principais tendências globais do setor, palestrantes nacionais e internacionais e excelentes oportunidades de negócios para todo o trade turístico e mercado em geral.",
  keywords: ["indicação geográfica", "produtos brasileiros", "terroir", "gastronomia", "turismo", "gramado", "evento", "connection experience", "networking"],
  authors: [{ name: "Connection Experience" }],
  openGraph: {
    title: "Connection Experience",
    description: "O Connection Experience é uma solução inovadora de conteúdo, networking e experiências especializado no mercado de turismo. Um modelo de evento híbrido com programação diferenciada, trazendo as principais tendências globais do setor, palestrantes nacionais e internacionais e excelentes oportunidades de negócios para todo o trade turístico e mercado em geral.",
    type: "website",
    locale: "pt_BR",
    siteName: "Connection Experience",
    images: [
      {
        url: "/images/og-image.png",
        width: 1464,
        height: 758,
        alt: "Connection Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connection Experience",
    description: "O Connection Experience é uma solução inovadora de conteúdo, networking e experiências especializado no mercado de turismo. Um modelo de evento híbrido com programação diferenciada, trazendo as principais tendências globais do setor, palestrantes nacionais e internacionais e excelentes oportunidades de negócios para todo o trade turístico e mercado em geral.",
    images: ["/images/og-image.png"],
  },
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navFooterData = null;
  let eventPhase = 'pre-event';
  let promoBanner: any = null;
  try {
    const payload = await getPayload({ config });
    const [navData, siteSettings] = await Promise.all([
      payload.findGlobal({ slug: 'navigation-footer' }),
      payload.findGlobal({ slug: 'site-settings' }),
    ]);
    navFooterData = navData;
    eventPhase = siteSettings.event?.phase || 'pre-event';
    promoBanner = (siteSettings as any).promoBanner || null;
  } catch {
    // CMS unavailable, use fallback
  }

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P4P9PJKF');`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1667005444723296');
fbq('track', 'PageView');`}
        </Script>
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${boska.variable} ${justSans.variable} antialiased`}
        data-event-phase={eventPhase}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4P9PJKF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1667005444723296&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Header
          ctaText={navFooterData?.navigation?.ctaText || undefined}
          ctaLink={navFooterData?.navigation?.ctaLink || undefined}
          hiddenNavItems={navFooterData?.navigation?.hiddenNavItems?.map((item: any) => item.label) || []}
        />
        <main>{children}</main>
        <Footer cmsData={navFooterData} />
        <PromoSidePopup config={promoBanner} />
      </body>
    </html>
  );
}
