import * as React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="hr">
        <meta
          name="viewport"
          content="width=device-width,
          user-scalable=no"
        />
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

AppDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {

  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};