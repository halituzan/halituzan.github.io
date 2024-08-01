import { useTheme } from "@/app/Configs/ThemeContext";
import { BlogPost } from "@/app/Configs/types";
import Network from "@/app/Utils/Network";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  data: BlogPost[];
};

const Blog = ({ data }: Props) => {
  const { theme } = useTheme();
  return (
    <section className='w-full p-5 h-[calc(100vh-107px)] overflow-auto'>
      <h1 className='text-3xl font-semibold w-full pb-1'>Blog Posts</h1>
      {data.map((item) => {
        return (
          <article key={item._id} className='my-6'>
            <Link href={`/blogs/${item.url + "-" + item.code}`}>
              <h3
                className={`text-xl mb-1 cursor-pointer font-bold text-orange-500 hover:text-orange-600`}
              >
                {item.title}
              </h3>
            </Link>
            <div className='flex items-center border-y py-1 border-y-slate-400'>
              <div className='flex justify-start items-center mr-4'>
                <Icon
                  icon={"fluent:calendar-ltr-12-regular"}
                  className='mr-2'
                />
                <p className='italic text-sm' role='date'>
                  {moment(item.releaseDate).format("MMMM DD [,] YYYY")}
                </p>
              </div>
              <div className='flex justify-start items-center mr-4'>
                <Icon icon={"fluent:pen-16-regular"} className='mr-2' />
                <p className='italic text-sm' role='author'>
                  {item.author}
                </p>
              </div>
              <div className='flex justify-start items-center mr-2'>
                <p className='text-sm flex items-center' role='author'>
                  {item.tags.map((i: { name: string; id: string }) => (
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
              <p>{item.summary}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Blog;
