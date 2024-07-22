import BlogsComponent from "@/app/AdminComponents/Blogs/BlogsComponent";
import React from "react";

type Props = {};

const Blogs = (props: Props) => {
  return (
    <div>
      <BlogsComponent />
    </div>
  );
};

export default Blogs;

Blogs.displayName = "admin";
