import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Charset */}
        <meta charSet="utf-8" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mnemosym.com" />

        {/* Viewport (sécurité si jamais absent ailleurs) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon (si présent) */}
        <link rel="icon" href="/favicon.ico" />

        {/* Optionnel : couleur thème navigateur */}
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
