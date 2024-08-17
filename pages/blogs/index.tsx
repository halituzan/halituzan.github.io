import Blog from "@/app/Components/Main/Pages/Blog";
import { BlogPost } from "@/app/Configs/types";
import Network from "@/utils/Network";

type Props = {
  data: BlogPost[];
};

const BlogsPage = ({ data }: Props) => {
  return <Blog data={data} title='Blog Post' isTagPage={false} />;
};

export default BlogsPage;

export async function getServerSideProps(context: any) {
  try {
    const res = await Network.run(
      context,
      "GET",
      `/blogs?id=${process.env.NEXT_PUBLIC_USER_ID}`,
      null
    );
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
