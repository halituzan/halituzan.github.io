"use client"
import { BlogPost, TagProps } from "@/app/Configs/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import hljs from "highlight.js";
import "highlight.js/styles/1c-light.css"; 
// import "highlight.js/styles/github-dark.css";
import moment from "moment";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  data: BlogPost;
};

const SingleBlogPost = ({ data }: Props) => {
  const router = useRouter();
  useEffect(() => {
    hljs.highlightAll();
  }, [data.content]);

  return (
    <div className="w-full">
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
    </div>
  );
};

export default SingleBlogPost;
