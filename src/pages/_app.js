function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} key={pageProps.route} />;
  }
  
  export default MyApp;
  