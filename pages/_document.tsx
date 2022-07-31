import Document, { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/head/Favicon';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Favicon />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
