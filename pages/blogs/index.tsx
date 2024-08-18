import Blog from "@/app/Components/Main/Pages/Blog";
import Loading from "@/app/Components/Patterns/Loading";
import { BlogPost } from "@/app/Configs/types";
import Network from "@/utils/Network";

type Props = {
  data: BlogPost[];
};

const BlogsPage = ({ data }: Props) => {
  console.log("data", data);

  if (data.length == 0) {
    return <Loading />;
  }
  return <Blog data={data} title='Blog Post' isTagPage={false} />;
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
