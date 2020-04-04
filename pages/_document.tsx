import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render(): JSX.Element {
    return (
      <html lang="hr">
        <meta
          name="viewport"
          content="width=device-width,
          user-scalable=no"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
