// lib/features/breadcrumb/routeSlice.ts

import { pages } from "@/app/Components/Main/Pages/pageList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

interface SelectableItem {
  id: number | string;
  title: string;
  name: string;
  key: string;
  icon: string;
  isOpen: boolean;
}
interface PageListItem {
  id: number | string;
  title: string;
  name: string;
  key: string;
  icon: string;
  isOpen: boolean;
  component?: React.ReactNode;
}
interface RouteProps {
  selectedPageList: SelectableItem[];
  pageList: PageListItem[];
  currentSide: string;
}

const initialState: RouteProps = {
  selectedPageList: [],
  pageList: [...pages],
  currentSide: "",
};

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setCurrentSide: (state, action: PayloadAction<string>) => {
      state.currentSide = action.payload;
    },
    setSelectedPagelist: (
      state,
      action: PayloadAction<{
        data: PageListItem;
        type: "add" | "remove" | "closeAll";
      }>
    ) => {
      const { data, type } = action.payload;

      if (type === "add") {
        state.selectedPageList.push({ ...data, isOpen: true });
      }

      if (type === "remove") {
        const index = state.selectedPageList.findIndex(
          (item) => item.id === data.id
        );
        if (index !== -1) {
          state.selectedPageList.splice(index, 1);
        }
      }

      if (type === "closeAll") {
        state.selectedPageList = state.selectedPageList.map((i) => {
          return {
            ...i,
            isOpen: false,
          };
        });
        state.pageList = state.pageList.map((i) => {
          return {
            ...i,
            isOpen: false,
          };
        });
      }
    },
    openCurrentPage: (
      state,
      action: PayloadAction<{ item: PageListItem; isOpen: boolean }>
    ) => {
      const { item, isOpen } = action.payload;
      const filteredArray = state.selectedPageList.map((i: any) => {
        if (i.id === item?.id) {
          return { ...i, isOpen };
        } else {
          return { ...i, isOpen: false };
        }
      });
      const filteredList = state.pageList.map((i: any) => {
        if (i.id === item?.id) {
          return { ...i, isOpen };
        } else {
          return { ...i, isOpen: false };
        }
      });
      state.selectedPageList = filteredArray;
      state.pageList = filteredList;
    },
    transitionPage: (
      state,
      action: PayloadAction<{ index: number; arr: any; type: string }>
    ) => {
      const { arr, index, type } = action.payload;
      if (type === "prev") {
        console.log("prev", index);
        console.log("selectedPageList", arr);
        const currentPageIndex = arr.findIndex((i: any) => i.isOpen);
        if (arr.length === index) {
          state.currentSide = "";
        }
      }
      if (type === "next") {
        console.log("next", index);
        console.log("selectedPageList", arr);
      }
    },
  },
});

export const {
  setCurrentSide,
  setSelectedPagelist,
  openCurrentPage,
  transitionPage,
} = routeSlice.actions;
export const selectCurrentSide = (state: { routes: RouteProps }) =>
  state.routes.currentSide;
export const selectedPageList = (state: { routes: RouteProps }) =>
  state.routes.selectedPageList;
export const pageListing = (state: { routes: RouteProps }) =>
  state.routes.pageList;
export const currentPageIndex = (state: { routes: RouteProps }) => {
  return state.routes.selectedPageList.findIndex((i) => i.isOpen);
};

export default routeSlice.reducer;
