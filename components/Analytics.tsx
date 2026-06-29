"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// GA4 loads ONLY after the visitor grants consent (GDPR). Set NEXT_PUBLIC_GA_ID
// in .env.local to enable. No analytics cookies are set before consent.
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

  if (!GA_ID || !granted) return null;

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
