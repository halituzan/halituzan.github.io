import SingleBlogPost from "@/app/Components/Main/Pages/BlogPost";
import { BlogPost } from "@/app/Configs/types";
import Network from "@/utils/Network";

type Props = {
  data: BlogPost;
  errorMessage: boolean;
};

const BlogsPost = ({ data, errorMessage }: Props) => {
  console.log(data);

  return (
    <div className="w-full">
      {errorMessage ? "Sayfaya Ulaşılamıyor" : <SingleBlogPost data={data} />}
    </div>
  );
};

export default BlogsPost;

export async function getServerSideProps(context: any) {
  const code = context.query.url.split("BP-")[1];

  if (!code) {
    return;
  }
  try {
    const res = await Network.run(
      context,
      "GET",
      `/blogs/detail?code=${code}`,
      null
    );
    return {
      props: {
        data: res.data || [],
        errorMessage: res.data == null ? true : false,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        errorMessage: true,
      },
    };
  }
}
