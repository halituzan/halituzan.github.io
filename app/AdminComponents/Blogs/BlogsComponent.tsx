import React, { useEffect, useState } from "react";
import Tiptap from "./Tiptap";
import Network from "@/app/Utils/Network";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";

type Props = {};

const BlogsComponent = (props: Props) => {
  const [openAddBlogPost, setOpenAddBlogPost] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const getBlogList = async () => {
    try {
      const res = await Network.getData("blogs");
      console.log(res);
      setBlogList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogList();
  }, []);
  return (
    <div>
      {openAddBlogPost ? (
        <Tiptap setOpen={setOpenAddBlogPost} />
      ) : (
        <div className='p-4 flex justify-end'>
          <button
            onClick={() => setOpenAddBlogPost(true)}
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
            className='bg-slate-50 hover:bg-slate-100  rounded-md mb-2'
          >
            <h4 className='text-2xl font-semibold p-2'>{item.title}</h4>
            <div className='flex justify-between items-center my-2 border-b border-t text-sm bg-slate-100'>
              <div className='flex p-2'>
                <div>
                  <strong>Yazar: </strong>
                  <span>Halit Uzan</span>
                </div>

                <div className='ml-2'>
                  <strong>Yayın Tarih: </strong>
                  <span>
                    {moment(item.releaseDate).format("DD.MM.YYYY HH:mm")}
                  </span>
                </div>
                {item.releaseDate != item.updatedAt && (
                  <div className='ml-2'>
                    <strong className='text-red-800'>Güncelleme Tarih: </strong>
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
                  className='cursor-pointer text-slate-500 hover:text-green-700'
                  fontSize={24}
                />
                <Icon
                  icon={"bx:link-external"}
                  className='cursor-pointer text-slate-500 hover:text-green-700'
                  fontSize={24}
                />
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
  );
};

export default BlogsComponent;
