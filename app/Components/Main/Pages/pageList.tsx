import React from "react";
import About from "./About";
import Portfolio from "./Portfolio";
import Skills from "./Skills";
import WorkHistory from "./WorkHistory";
import Blog from "./Blog";
interface PagesProps {
  id: number;
  title: string;
  name: string;
  key: string;
  icon: string;
  isOpen: boolean;
  component?: React.ReactNode;
  url?: string;
}
export const pages: PagesProps[] = [
  {
    id: 1,
    title: "title.about",
    name: "name.about",
    key: "about",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/about",
    component: <About />,
  },
  {
    id: 2,
    title: "title.skills",
    name: "name.skills",
    key: "skills",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/skills",
    component: <Skills />,
  },
  {
    id: 3,
    title: "title.works",
    name: "name.works",
    key: "works",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/work-history",
    component: <WorkHistory />,
  },
  {
    id: 4,
    title: "title.portfolio",
    name: "name.portfolio",
    key: "portfolio",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/portfolio",
    component: <Portfolio />,
  },
  {
    id: 5,
    title: "title.blog",
    name: "name.blog",
    key: "blog",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/blogs",
    component: <></>,
  },
];
