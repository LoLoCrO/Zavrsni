import * as React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import '../global.scss';

const App: NextPage<AppProps> =
    ({ Component, pageProps }): JSX.Element =>
        (<Component {...pageProps} />);

export default App;