"use client";
import { BlogPost, TagProps } from "@/app/Configs/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import hljs from "highlight.js";
import "highlight.js/styles/1c-light.css";
// import "highlight.js/styles/github-dark.css";
import Network from "@/utils/Network";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  data: BlogPost;
  code: string;
};

const SingleBlogPost = ({ data, code }: Props) => {
  console.log("code", code);

  const [like, setLike] = useState(data.like);
  const getCount = async (endpoint: string) => {
    try {
      await Network.run(
        null,
        "GET",
        "/blogs/interactions/" + endpoint + "?code=" + code,
        null
      );
      setLike((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hljs.highlightAll();
  }, [data.content]);

  return (
    <div className='w-full relative'>
      <section className='w-full p-5 h-[calc(100vh-107px)] overflow-auto'>
        <h1 className='text-4xl my-0 font-semibold'>{data.title}</h1>
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
                {data.tags.map((i: TagProps) => (
                  <Link
                    href={"/tags/" + i.url}
                    key={i._id}
                    className='mr-1 font-semibold cursor-pointer text-sm hover:underline hover:text-orange-500 flex items-center'
                  >
                    <Icon
                      icon={"line-md:hash-small"}
                      className='text-orange-500'
                    />
                    {i.name}
                  </Link>
                ))}
              </p>
            </div>
          </div>
          <div className='mt-2 text-sm font-medium content-area'>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </article>
      </section>
      <div
        onClick={() => getCount("like")}
        className='fixed bottom-10 right-10 cursor-pointer hover:shadow flex items-center border p-2 rounded-full'
      >
        <span className='text-lg font-semibold min-w-[40px] text-end select-none'>{like}</span>
        <Icon
          icon='ph:hands-clapping-fill'
          className='hover:text-orange-600 select-none'
          fontSize={36}
        />
      </div>
    </div>
  );
};

export default SingleBlogPost;
