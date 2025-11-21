"use client";

import Script from "next/script";

export default function Scripts() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const SESSION_REWIND_KEY = process.env.NEXT_PUBLIC_SESSION_REWIND_KEY;

  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Session Rewind */}
      {SESSION_REWIND_KEY && (
        <Script id="sessionrewind" strategy="afterInteractive">
          {`
            !(function(o){
              var w=window;
              w.SessionRewindConfig=o;
              var f=document.createElement('script');
              f.async=1;
              f.crossOrigin='anonymous';
              f.src='https://rec.sessionrewind.com/srloader.js';
              var g=document.getElementsByTagName('head')[0];
              g.insertBefore(f,g.firstChild);
            })({
              apiKey: '${SESSION_REWIND_KEY}',
              startRecording: true,
              userInfo: { userId: 'visitor@anuragsawant.in' }
            });
          `}
        </Script>
      )}
    </>
  );
}
