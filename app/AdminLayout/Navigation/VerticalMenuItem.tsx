import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const VerticalMenuItems = ({ open, item, allTimeOpen }: any) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <button
      className={`my-1 p-2 rounded-md w-full flex justify-start items-center hover:font-bold hover:bg-slate-600 hover:text-white ${
        pathname === item.path
          ? "bg-slate-600 text-white font-bold"
          : "bg-transparent text-slate-600"
      }`}
      onClick={() => {
        router.push(item.path);
      }}
    >
      <span className='mr-2'>
        <Icon icon={item.icon} fontSize={24} />
      </span>
      {(allTimeOpen || open) && item.label}
    </button>
  );
};

export default VerticalMenuItems;
