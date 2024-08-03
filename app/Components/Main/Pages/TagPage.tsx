import { useRouter } from "next/router";
import React from "react";

type Props = {};

const TagPage = (props: Props) => {
  const router = useRouter();

  const { tag } = router.query;
  console.log(tag);
  return (
    <div className='w-full p-5 h-[calc(100vh-107px)] overflow-auto'>
      TagPage
    </div>
  );
};

export default TagPage;
