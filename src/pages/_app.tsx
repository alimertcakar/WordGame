import type { AppProps } from "next/app";
import useSWR, { SWRConfig } from "swr";
import http from "src/http/client";
import { useEffect } from "react";
import Head from "next/head";
import theme from "src/theme";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { RootState, store, persistor } from "src/store";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import { injectStore } from "src/http/client";
injectStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <SWRConfig
        value={{
          // cache,
          dedupingInterval: 1000 * 15,
          fetcher: (url) => http.get(url).then((res) => res.data),
        }}
      >
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <ThemeProvider theme={theme}> */}
            <ChakraProvider>
              <main>
                <Component {...pageProps} />
              </main>
            </ChakraProvider>

            {/* </ThemeProvider> */}
          </PersistGate>
        </Provider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
