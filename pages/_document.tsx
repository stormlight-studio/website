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
