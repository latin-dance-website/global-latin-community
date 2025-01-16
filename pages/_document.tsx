import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

class CustomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add Google Fonts or Custom Fonts Here */}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
          {/* You can add more font links here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;