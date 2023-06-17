import { siteTitle, siteDescription } from '@0xcard/lib/const'

export default function MetaTags(): JSX.Element {
  return (
    <>
      <meta name="description" content={siteDescription} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="application-name" content={siteTitle} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#3F51B5" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#3F51B5" />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/icons/icon-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="384x384"
        href="/icons/icon-384x384.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="256x256"
        href="/icons/icon-256x256.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="/icons/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/icons/favicon-16x16.png"
        sizes="16x16"
      />
      <link rel="icon" href="/icons/favicon.ico" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
    </>
  )
}
