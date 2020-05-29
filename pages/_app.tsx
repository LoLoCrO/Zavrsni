import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../global.scss';

const App: NextPage<AppProps> = ({ Component, pageProps }): JSX.Element => {

    React.useEffect(() => {
        const jssStyles: Element | null = document.querySelector('#jss-server-side');
        if (jssStyles) { jssStyles.parentElement?.removeChild(jssStyles); }
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Component {...pageProps} />
        </React.Fragment>
    );
}

export default App;