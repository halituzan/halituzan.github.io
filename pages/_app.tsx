//* React And Redux Imports
import { useEffect, useRef, useState } from "react";
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
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function App({ Component, pageProps }: AppProps) {
  const messageAlert = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { locale } = router;
  const [loading, setLoading] = useState(true);
  const isAdmin = Component.displayName;
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  useEffect(() => {
    i18n.initLanguage();
    setLoading(false);
    setOpenAlert(
      (localStorage.getItem("message_alert") as unknown as string) === "false"
        ? false
        : true
    );
  }, [locale]);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        messageAlert.current &&
        !messageAlert.current.contains(event.target)
      ) {
        setOpenAlert(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {openAlert && (
        <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-white/20'>
          <div
            className='w-60 h-60 bg-white rounded-xl flex flex-col justify-center items-center shadow-md p-4 relative'
            ref={messageAlert}
          >
            <button
              className='absolute top-3 right-3'
              onClick={() => setOpenAlert(false)}
            >
              <Icon
                icon={"fa6-solid:xmark"}
                fontSize={24}
                className='text-slate-600 hover:text-orange-600'
              />
            </button>
            <p className='text-center w-full text-lg'>
              Yeni portfoliom güncellenmiştir ziyaret etmek için aşağıdaki
              bağlantıyı kullanın
            </p>
            <Link
              href={"https://halituzan.com"}
              className='my-4 text-lg font-semibold hover:text-slate-700'
            >
              halituzan.com
            </Link>
            <div className='flex items-center'>
              <input
                id='notShow'
                type='checkbox'
                onChange={(e) =>
                  localStorage.setItem(
                    "message_alert",
                    (!e.currentTarget.checked).toString()
                  )
                }
                className='border border-slate-900 rounded-lg w-4 h-4 cursor-pointer'
              />
              <label htmlFor='notShow' className='ml-2 cursor-pointer'>
                Bir daha gösterme
              </label>
            </div>
          </div>
        </div>
      )}

      {/* </I18nextProvider> */}
    </Provider>
  );
}
