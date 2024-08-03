import React from "react";
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
  },
  {
    id: 2,
    title: "title.skills",
    name: "name.skills",
    key: "skills",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/skills",
  },
  {
    id: 3,
    title: "title.works",
    name: "name.works",
    key: "works",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/work-history",
  },
  {
    id: 4,
    title: "title.portfolio",
    name: "name.portfolio",
    key: "portfolio",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/portfolio",
  },
  {
    id: 5,
    title: "title.blog",
    name: "name.blog",
    key: "blog",
    icon: "fluent:code-ts-16-filled",
    isOpen: false,
    url: "/blogs",
  },
];
