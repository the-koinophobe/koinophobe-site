"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Analytics load ONLY after the visitor grants consent (GDPR). Configure ONE
// of these in .env.local / Vercel env:
//   NEXT_PUBLIC_GTM_ID  GTM-XXXXXXX  -> loads Google Tag Manager (recommended:
//                       put GA4 and everything else inside the container)
//   NEXT_PUBLIC_GA_ID   G-XXXXXXXXXX -> loads GA4 directly, no GTM
// If both are set, only GTM loads to avoid double-tracking.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setGranted(localStorage.getItem("cookie-consent") === "granted");
      } catch {}
    };
    read();
    window.addEventListener("cookie-consent-changed", read);
    return () => window.removeEventListener("cookie-consent-changed", read);
  }, []);

  if (!granted) return null;

  if (GTM_ID) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    );
  }

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
