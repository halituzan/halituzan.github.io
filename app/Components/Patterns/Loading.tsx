
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='flex justify-center'>
      <span className='circle animate-loader'></span>
      <span className='circle animate-loader animation-delay-200'></span>
      <span className='circle animate-loader animation-delay-400'></span>
    </div>
  );
};

export default Loading;
