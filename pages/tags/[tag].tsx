import Blog from "@/app/Components/Main/Pages/Blog";
import { BlogPost } from "@/app/Configs/types";
import Network from "@/utils/Network";

type Props = {
  data: BlogPost[];
  errorMessage: boolean;
};

const TagsPage = ({ data, errorMessage }: Props) => {
  return <Blog data={data} title='Tags Page' isTagPage={true} />;
};

export default TagsPage;

export async function getServerSideProps(context: any) {
  const { tag } = context.query;

  if (!tag) {
    return {
      props: {},
    };
  }
  try {
    const res = await Network.run(
      context,
      "GET",
      `/api/blogs/blogtags?tag=${tag}`,
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
