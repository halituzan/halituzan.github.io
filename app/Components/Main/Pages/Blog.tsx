"use client";
import { BlogPost, TagProps } from "@/app/Configs/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../Patterns/Loading";
import Network from "@/utils/Network";

type Props = {
  title: string;
  isTagPage: boolean;
};

const Blog = ({ title, isTagPage }: Props) => {
  const router = useRouter();
  const { tag } = router.query;
  const [datas, setDatas] = useState<BlogPost[]>([]);

  const getData = async () => {
    try {
      const res = await Network.run(null, "GET", `/api/blogs`, null);
      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTag = async () => {
    try {
      const res = await Network.run(
        null,
        "GET",
        `/api/blogs/blogtags?tag=${tag}`,
        null
      );
      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isTagPage) {
      getTag();
    } else {
      getData();
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <section className='w-full p-5 h-[calc(100vh-107px)] overflow-auto'>
        <h1 className='text-3xl font-semibold w-full pb-1'>{title}</h1>
        {isTagPage && (
          <div>
            <Link
              href={"/blogs"}
              className='flex items-center cursor-pointer w-[100px] mb-5'
            >
              <Icon
                icon='solar:map-arrow-left-bold-duotone'
                className='text-orange-500'
                fontSize={28}
              />
              <span className='text-lg font-bod ml-1 font-bold hover:text-orange-600 hover:underline '>
                Tümü
              </span>
            </Link>
            <div>
              <span className='font-bold'>{tag}</span> etiketi ile{" "}
              <span className='font-bold'>({datas.length})</span> adet içerik
              bulundu
            </div>
          </div>
        )}

        {datas.map((item: any) => {
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
                    {item.tags.map((i: TagProps) => {
                      return (
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
                      );
                    })}
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
    </Suspense>
  );
};

export default Blog;
