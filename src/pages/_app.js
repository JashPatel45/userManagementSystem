import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    console.log("Current route:", router.asPath);
  }, [router.asPath]);

  return <Component {...pageProps} key={router.asPath} />;
}

export default MyApp;
