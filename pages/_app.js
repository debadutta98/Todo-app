import Header from "../components/Header";
import "../styles/dist.css";
import "../styles/customCheckBox.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import style from "../styles/loading.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Provider from "../components/context";
function Loading() {
  const [loading, setShowLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handlerStart = (url) => url !== router.asPath && setShowLoading(true);
    const handlerComplete = (url) =>
      url === router.asPath && setShowLoading(false);
    router.events.on("routeChangeStart", handlerStart);
    router.events.on("routeChangeComplete", handlerComplete);
    router.events.on("routeChangeError", handlerComplete);
    return () => {
      router.events.off("routeChangeStart", handlerStart);
      router.events.off("routeChangeComplete", handlerComplete);
      router.events.off("routeChangeError", handlerComplete);
    };
  });
  return (
    <>
      {loading && (
        <div className={style["loading"]}>
          <div className={style["lds-ellipsis"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Loading />
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
      <footer className="text-center mt-6 text-xs text-light-darkGrayishBlue">
        Drag and drop to reorder list
      </footer>
    </Provider>
  );
}

export default MyApp;
