//* React And Redux Imports
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
//* Next Imports
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
//* i18n Imports
import "@/app/Configs/i18n";
import i18n from "@/app/Configs/i18n";
//* Theme Imports
import { ThemeProvider } from "@/app/Configs/ThemeContext";
//* Styles and Fonts Imports
import { poppins } from "@/app/Assets/Fonts/localFonts.helper";
import "@/app/Assets/resizable.css";
import "@/app/globals.css";
import "highlight.js/styles/a11y-light.min.css";
//* Component Imports
import Layout from "@/app/Layout";
import store from "@/lib/store";
import AdminLayout from "@/app/AdminLayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  const [loading, setLoading] = useState(true);
  const isAdmin = Component.displayName;
  useEffect(() => {
    i18n.initLanguage();
    setLoading(false);
  }, [locale]);

  if (loading) {
    return;
  }
  return (
    <Provider store={store}>
      {/* <I18nextProvider i18n={i18n}> */}
      <ThemeProvider>
        <main className={poppins.className}>
          {isAdmin === "admin" ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </main>
      </ThemeProvider>
      {/* </I18nextProvider> */}
    </Provider>
  );
}
