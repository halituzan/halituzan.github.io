import SingleBlogPost from "@/app/Components/Main/Pages/BlogPost";
import Network from "@/utils/Network";

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
  data: BlogPost;
  errorMessage: boolean;
};

const BlogPost = ({ data, errorMessage }: Props) => {
  console.log(data);

  return (
    <div>
      {errorMessage ? "Sayfaya Ulaşılamıyor" : <SingleBlogPost data={data} />}
    </div>
  );
};

export default BlogPost;

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
