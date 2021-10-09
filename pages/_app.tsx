//===================== module
import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../redux/store';
// ======== comp
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout } from '../components/layout/layout';
// ========== styles
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';
import '../styles/globals.css';

export type AuthStateUid = 'authStateUid';


export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;


  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>

        </ThemeProvider>
      </Provider>

    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};