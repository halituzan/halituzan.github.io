import { BlogPost } from "@/app/Configs/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment } from "react";

type Props = {
  data: BlogPost;
};

const SingleBlogPost = ({ data }: Props) => {
  console.log(data);

  return (
    <Fragment>
      <Head>
        <link
          rel='stylesheet'
          href='//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css'
        ></link>
      </Head>
      <section className='w-full p-5 h-[calc(100vh-107px)] overflow-auto'>
        <h1 className='text-3xl font-semibold'>{data.title}</h1>
        <article className='my-6'>
          <div className='flex items-center py-1'>
            <div className='flex justify-start items-center mr-4'>
              <Icon icon={"fluent:calendar-ltr-12-regular"} className='mr-2' />
              <p className='italic text-sm' role='date'>
                {moment(data.releaseDate).format("MMMM DD [,] YYYY")}
              </p>
            </div>
            <div className='flex justify-start items-center mr-4'>
              <Icon icon={"fluent:pen-16-regular"} className='mr-2' />
              <p className='italic text-sm' role='author'>
                {data.author}
              </p>
            </div>
            <div className='flex justify-start items-center mr-2'>
              <p className='text-sm flex items-center' role='author'>
                {data.tags.map((i: { name: string; id: string }) => (
                  <span
                    key={i.id}
                    className='mr-1 font-semibold cursor-pointer text-sm hover:underline hover:text-orange-500 flex items-center'
                  >
                    <Icon
                      icon={"line-md:hash-small"}
                      className='text-orange-500'
                    />
                    {i.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className='mt-2 text-sm font-medium'>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
        </article>
      </section>
    </Fragment>
  );
};

export default SingleBlogPost;
