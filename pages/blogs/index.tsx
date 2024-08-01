import Blog from "@/app/Components/Main/Pages/Blog";
import Network from "@/utils/Network";
import React from "react";
interface BlogPost {
  _id: number;
  title: string;
  content: string;
  url: string;
  code: string;
  summary: string;
  author: string;
  releaseDate: string;
  updatedAt: string;
  tags: [
    {
      name: string;
      id: "string";
    }
  ];
  like: number;
  view: number;
  share: number;
}
type Props = {
  data: BlogPost[];
};

const BlogsPage = ({ data }: Props) => {
  return <Blog data={data} />;
};

export default BlogsPage;

export async function getServerSideProps(context: any) {
  try {
    const res = await Network.run(context, "GET", `/blogs`, null);
    return {
      props: {
        data: res.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
}
