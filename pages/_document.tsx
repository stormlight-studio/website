import Document, { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/head/Favicon';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Favicon />
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="trustpilot-one-time-domain-verification-id"
            content="5fd5ed5d-1faf-4866-8e4f-c25b2f8d06dc"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
