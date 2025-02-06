import { ChakraProvider } from "@chakra-ui/react";
import "@styles/global.css";
import { AppProps } from "next/app";

import theme from "../theme/theme.js";
import Fonts from "../theme/Fonts.jsx";
import { StrictMode } from "react";
import Head from "next/head.js";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StrictMode>
      <Head>
        {/* Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Global Latin Dance Community | Connect, Learn, Dance</title>

        <meta name="title" content="Global Latin Dance Community" />
        <meta
          name="description"
          content="Join the vibrant Global Latin Dance Community. Discover events, connect with dancers, and celebrate Latin culture through dance!"
        />
        <meta
          name="keywords"
          content="Latin Dance, Salsa, Bachata, Kizomba, Dance Events, Global Dance Community, Global Latin Dance Community"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Global Latin Dance Community" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.globallatindancecommunity.com/" />
        <meta property="og:title" content="Global Latin Dance Community" />
        <meta
          property="og:description"
          content="Join the vibrant Global Latin Dance Community. Discover events, connect with dancers, and celebrate Latin culture through dance!"
        />

        <meta
          property="og:image"
          content="https://www.globallatindancecommunity.com/assets/images/ogLogo4(200).png"
        />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/png" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.globallatindancecommunity.com/"
        />
        <meta property="twitter:title" content="Global Latin Dance Community" />
        <meta
          property="twitter:description"
          content="Join the vibrant Global Latin Dance Community. Discover events, connect with dancers, and celebrate Latin culture through dance!"
        />
        <meta
          property="twitter:image"
          content="https://www.globallatindancecommunity.com/assets/images/ogLogo4(200).png"
        />

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </StrictMode>
  );
}

export default MyApp;
