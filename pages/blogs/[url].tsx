import SingleBlogPost from "@/app/Components/Main/Pages/BlogPost";
import { BlogPost } from "@/app/Configs/types";

type Props = {
  data: BlogPost;
  errorMessage: boolean;
  code: string;
};

const BlogsPost = ({ data, errorMessage, code }: Props) => {
  return (
    <div className='w-full'>
      {errorMessage ? "Sayfaya Ulaşılamıyor" : <SingleBlogPost />}
    </div>
  );
};

export default BlogsPost;
