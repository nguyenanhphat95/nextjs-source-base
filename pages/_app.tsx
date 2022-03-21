import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "setup/material-ui/createEmotionCache";
import theme from "setup/material-ui/theme";
import "./../styles/globals.css";
import { PopupNotify } from "components/commons";
import Script from "next/script";
import _get from "lodash/get";
import { Provider } from "react-redux";
import store from "store/store";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [popupNotify, setPopupNotify] = React.useState({
    open: false,
    desc: "",
    onClose: () => null,
  });
  const [md5, setMd5] = React.useState(null);

  function toggleNotify(desc?: string, onClose?: any) {
    setPopupNotify((prev) => {
      if (desc && typeof desc === "string") {
        return {
          open: true,
          desc,
          onClose: onClose ? onClose : () => null,
        };
      }
      prev.onClose && prev?.onClose();
      return {
        open: false,
        desc: "",
        onClose: () => null,
      };
    });
  }
  console.log("app-component");
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Script id="lottie-id" src="/asset/js/lottie.min.js" />
      <Script id="jsqr-id" src="/asset/js/jsQR.js" />
      <Script id="vnptbrowser-id" src="/asset/js/VNPTBrowserSDKAppV2.3.3.js" />
      <Script
        id="md5-id"
        src="/asset/js/md5.min.js"
        onLoad={() => {
          const md5 = _get(window, "md5");
          setMd5(md5);
        }}
      />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {md5 && <Component toggleNotify={toggleNotify} {...pageProps} />}
          <PopupNotify
            title="Thông báo"
            desc={popupNotify.desc}
            open={popupNotify.open}
            toggleModal={toggleNotify}
          />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
