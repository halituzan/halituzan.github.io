import SingleBlogPost from "@/app/Components/Main/Pages/BlogPost";
import { BlogPost } from "@/app/Configs/types";
import Network from "@/utils/Network";

type Props = {
  data: BlogPost;
  errorMessage: boolean;
  code: string;
};

const BlogsPost = ({ data, errorMessage, code }: Props) => {
  return (
    <div className='w-full'>
      {errorMessage ? (
        "Sayfaya Ulaşılamıyor"
      ) : (
        <SingleBlogPost data={data} code={code} />
      )}
    </div>
  );
};

export default BlogsPost;

export async function getServerSideProps(context: any) {
  const code = context.query.url.split("BP-")[1];

  if (!code) {
    return {
      props: {
        data: [],
        errorMessage: true,
        code: code,
      },
    };
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
        code: code,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        errorMessage: true,
        code: code,
      },
    };
  }
}
