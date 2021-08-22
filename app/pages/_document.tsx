import {
  DocumentContext,
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript /*DocumentContext*/,
} from 'blitz';

import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <script src="https://sdk.push7.jp/v2/p7sdk.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              p7.init("3f8731d8746049179cb321f570fa8ff7");
              `,
            }}
          />
        </DocumentHead>

        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
