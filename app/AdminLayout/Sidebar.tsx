import { Icon } from "@iconify/react";
import React, { useState } from "react";
import navigation from "./Navigation/Navigation";
import VerticalMenuItems from "./Navigation/VerticalMenuItem";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [allTimeOpen, setAllTimeOpen] = useState(true);

  return (
    <div
      onMouseEnter={() => {
        setOpenSidebar(true);
      }}
      onMouseLeave={() => {
        setOpenSidebar(false);
      }}
      className={`${
        allTimeOpen ? "w-[300px]" : openSidebar ? "w-[300px]" : "w-[75px]"
      } p-4 bg-white shadow-xl h-screen sidebar flex flex-col transition-all duration-500`}
    >
      <div className='flex items-center justify-center w-full mb-5'>
        <h2 className='text-xl font-bold flex-1'>Logo</h2>
        <span className='cursor-pointer'>
          {(allTimeOpen || openSidebar) && (
            <Icon
              icon={allTimeOpen ? "mdi:close" : "mdi:menu-open"}
              fontSize={18}
              className='text-slate-600'
              onClick={() => {
                allTimeOpen ? setAllTimeOpen(false) : setAllTimeOpen(true);
              }}
            />
          )}
        </span>
      </div>
      <div className='flex flex-col items-start '>
        {navigation.map((item) => {
          return (
            <VerticalMenuItems
              key={item.path}
              item={item}
              open={openSidebar}
              allTimeOpen={allTimeOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
