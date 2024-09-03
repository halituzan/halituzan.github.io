import {
  selectCurrentSide,
  setCurrentSide,
} from "@/lib/features/routes/routeSlice";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../Configs/ThemeContext";
import { useTranslation } from "react-i18next";
// import printJS from "print-js";

type Props = {};

const Sidebar = (props: Props) => {
  const { theme } = useTheme();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [showLang, setShowLang] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const { t } = useTranslation("common");
  const currentSideStorage = localStorage.getItem("currentSide");

  const changeLanguage = (lng: string) => {
    window.localStorage.setItem("lng", lng);
    document.documentElement.lang = lng;
    setSelectedLang(lng);
    router.reload();
  };
  const changeMode = (m: string) => {
    window.localStorage.setItem("theme", m);
    router.reload();
  };
  const dispatch = useDispatch();
  const currentSide = useSelector(selectCurrentSide);
  useEffect(() => {
    const lang = window.localStorage.getItem("lng");
    const md = window.localStorage.getItem("theme");
    setSelectedLang(lang);
    setMode(md);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebarBg =
    theme === "dark"
      ? "bg-dark2 text-light5/90 shadow shadow-slate-800"
      : "bg-light2 shadow shadow-white";
  return (
    <div
      className={`min-w-[40px] flex  z-10 flex-col items-center  justify-between self-stretch ${sidebarBg}`}
    >
      <div className='flex flex-col '>
        {menu.map((i) => {
          return (
            <div
              className={`px-3 mb-1 py-3 cursor-pointer ${
                theme === "dark"
                  ? i.path === currentSide || i.path === currentSideStorage
                    ? "border-l-2 border-slate-200"
                    : "border-transparent border-l-2"
                  : i.path === currentSide || i.path === currentSideStorage
                  ? "border-l-2 border-slate-900"
                  : "border-transparent border-l-2"
              }`}
              key={i.id}
              onClick={() => {
                if (currentSide === i.path) {
                  dispatch(setCurrentSide(""));
                  localStorage.setItem("currentSide", "");
                } else {
                  dispatch(setCurrentSide(i.path));
                  localStorage.setItem("currentSide", i.path);
                }
              }}
            >
              <Icon
                icon={i.icon}
                fontSize={32}
                className={` ${
                  theme === "dark"
                    ? i.path === currentSide || i.path === currentSideStorage
                      ? "text-light3 hover:text-light3"
                      : "text-light1 hover:text-light3"
                    : i.path === currentSide || i.path === currentSideStorage
                    ? "text-dark2 hover:text-dark2"
                    : "text-dark5 hover:text-dark2"
                }`}
              />
            </div>
          );
        })}
      </div>
      <div>
        <div
          className='px-2 mb-1 py-3 cursor-pointer relative'
          onClick={() => changeMode(mode === "light" ? "dark" : "light")}
        >
          <Icon
            icon={
              mode == "light"
                ? "material-symbols-light:mode-night"
                : "material-symbols-light:light-mode"
            }
            fontSize={32}
            className={` ${
              theme === "dark"
                ? "text-light1 hover:text-light3"
                : "text-dark4 hover:text-dark2"
            }`}
          />
        </div>

        <div
          className='px-2 mb-1 py-3 relative'
          onMouseEnter={() => setShowLang(true)}
          onMouseLeave={() => setShowLang(false)}
        >
          <Icon
            icon={
              selectedLang == "tr"
                ? "circle-flags:tr"
                : selectedLang == "en"
                ? "circle-flags:gb"
                : "circle-flags:tr"
            }
            fontSize={32}
            className={` ${
              theme === "dark"
                ? "text-light1 hover:text-light3"
                : "text-dark4 hover:text-dark2"
            }`}
          />
          {showLang && (
            <div className='absolute z-50 -top-10 left-12 flex flex-col justify-center items-center p-1 rounded-md bg-dark6'>
              <Icon
                onClick={() => changeLanguage("tr")}
                icon={"circle-flags:tr"}
                fontSize={32}
                className={`mb-2 cursor-pointer hover:shadow hover:shadow-slate-300 p-1 ${
                  theme === "dark"
                    ? "text-light1 hover:text-light3"
                    : "text-dark4 hover:text-dark2"
                }`}
              />
              <Icon
                onClick={() => changeLanguage("en")}
                icon={"circle-flags:gb"}
                fontSize={32}
                className={`cursor-pointer hover:shadow hover:shadow-slate-300 p-1 ${
                  theme === "dark"
                    ? "text-light1 hover:text-light3"
                    : "text-dark4 hover:text-dark2"
                }`}
              />
            </div>
          )}
        </div>
        <div
          className='px-2 mb-1 py-3 cursor-pointer relative'
          onClick={() => setShowProfile(!showProfile)}
        >
          <Icon
            icon={"gg:profile"}
            fontSize={32}
            className={` ${
              theme === "dark"
                ? "text-light1 hover:text-light3"
                : "text-dark4 hover:text-dark2"
            }`}
          />
          {showProfile && (
            <div
              ref={profileRef}
              className={`absolute rounded-lg bottom-4 left-11 w-[300px]  ${
                theme == "dark" ? "bg-dark4" : "bg-light4"
              }`}
            >
              <div className='flex flex-col justify-start'>
                <div
                  className={`flex justify-start items-center py-1 px-2 m-1 rounded-lg ${
                    theme === "dark" ? "hover:bg-dark3" : "hover:bg-light3"
                  }`}
                >
                  <Icon icon='tabler:eye' />
                  <a
                    href={
                      window.localStorage.getItem("lng") == "tr"
                        ? "./files/cv.pdf"
                        : window.localStorage.getItem("lng") == "en"
                        ? "./files/cv-en.pdf"
                        : "./files/cv.pdf"
                    }
                    className='ml-1'
                    target='_blank'
                  >
                    {t("cv.preview")}
                  </a>
                </div>
                <hr />
                <div
                  className={`flex justify-start items-center py-1 px-2 m-1 rounded-lg ${
                    theme === "dark" ? "hover:bg-dark3" : "hover:bg-light3"
                  }`}
                >
                  <Icon icon='tabler:file-download' />
                  <a
                    href={
                      window.localStorage.getItem("lng") == "tr"
                        ? "./files/cv.pdf"
                        : window.localStorage.getItem("lng") == "en"
                        ? "./files/cv-en.pdf"
                        : "./files/cv.pdf"
                    }
                    className='ml-1'
                    target='_blank'
                    download
                  >
                    {t("cv.download")}
                  </a>
                </div>
                {/* <div className='flex justify-start items-center'>
                <Icon icon='tabler:printer' />
                <div
                  className='ml-1'
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined") {
                      printJS("./files/cv.pdf");
                    }
                  }}
                >
                  Print CV
                </div>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const menu = [
  {
    id: 1,
    icon: "lucide:files",
    path: "pages",
  },
  // {
  //   id: 2,
  //   icon: "lucide:search",
  //   path: "search",
  // },
];
const settings = [
  {
    id: 1,
    icon: "gg:profile",
    path: "files",
  },
  // {
  //   id: 2,
  //   icon: "ic:outline-settings",
  //   path: "search",
  // },
];
