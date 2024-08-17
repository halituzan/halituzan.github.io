import React, { Fragment, useEffect, useState } from "react";
import Network from "@/app/Utils/Network";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import dynamic from "next/dynamic";
import Link from "next/link";
const Tiptap = dynamic(() => import("./Tiptap"), { ssr: false });
type Props = {};

const BlogsComponent = ({}: Props) => {
  const [openAddBlogPost, setOpenAddBlogPost] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [currentBlog, setCurrentBlog] = useState<null | object>(null);
  const getBlogList = async () => {
    try {
      const res = await Network.getData("admin/blogs");
      setBlogList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogList();
  }, []);
  return (
    <Fragment>
      <div>
        {openAddBlogPost ? (
          <div className='pb-12 '>
            <Tiptap
              setOpen={setOpenAddBlogPost}
              current={currentBlog}
              mount={getBlogList}
            />
          </div>
        ) : (
          <div className='p-4 flex justify-end'>
            <button
              onClick={() => {
                setOpenAddBlogPost(true);
                setCurrentBlog(null);
              }}
              className='py-1 px-2 bg-slate-500 hover:bg-slate-700 text-white rounded'
            >
              Yazı Ekle
            </button>
          </div>
        )}
        {blogList.map((item: any) => {
          return (
            <div
              key={item?._id}
              className='bg-slate-50 hover:bg-slate-100 rounded-md mb-2'
            >
              <h4 className='text-2xl font-semibold p-2'>{item.title}</h4>
              <div className='flex justify-between items-center my-2 border-b border-t text-sm bg-slate-100'>
                <div className='flex p-2'>
                  <div>
                    <strong>Yazar: </strong>
                    <span>{item.author}</span>
                  </div>

                  <div className='ml-2'>
                    <strong>Yayın Tarih: </strong>
                    <span>
                      {moment(item.releaseDate).format("DD.MM.YYYY HH:mm")}
                    </span>
                  </div>
                  {item.releaseDate != item.updatedAt && (
                    <div className='ml-2'>
                      <strong className='text-red-800'>
                        Güncelleme Tarih:{" "}
                      </strong>
                      <span>
                        {moment(item.updatedAt).format("DD.MM.YYYY HH:mm")}
                      </span>
                    </div>
                  )}
                </div>
                <div className='flex p-2'>
                  <div className='mr-2 flex items-center'>
                    <div>
                      <Icon
                        icon={"bx:share-alt"}
                        fontSize={20}
                        className='text-orange-600'
                      />
                    </div>
                    <span className='font-semibold'>{item.share}</span>
                  </div>
                  <div className='mr-2 flex items-center'>
                    <div>
                      <Icon
                        icon={"bx:stats"}
                        fontSize={24}
                        className='text-blue-600'
                      />
                    </div>
                    <span className='font-semibold'>{item.view}</span>
                  </div>
                  <div className='mr-5 flex items-center'>
                    <div>
                      <Icon
                        icon={"mdi:applause"}
                        fontSize={20}
                        className='text-orange-600'
                      />
                    </div>
                    <span className='font-semibold'>{item.like}</span>
                  </div>

                  <Icon
                    icon={"bx:edit"}
                    onClick={() => {
                      setCurrentBlog(item);
                      setOpenAddBlogPost(true);
                    }}
                    className='cursor-pointer text-slate-500 hover:text-green-700'
                    fontSize={24}
                  />
                  <Link
                    href={`/blogs/${item.url}-${item.code}`}
                    target='_blank'
                  >
                    <Icon
                      icon={"bx:link-external"}
                      className='cursor-pointer text-slate-500 hover:text-green-700'
                      fontSize={24}
                    />
                  </Link>
                </div>
              </div>
              <div className='p-3 '>
                <p>{item.summary}</p>
              </div>
              <div className='mb-2 flex border-t'>
                <div className='flex m-2'>
                  {item.tags.map((i: { name: string; id: string }) => (
                    <span
                      key={i.id}
                      className='mr-1 font-semibold text-orange-600 hover:text-orange-500 cursor-pointer text-sm'
                    >
                      #{i.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default BlogsComponent;
