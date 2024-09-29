import About from "@/app/Components/Main/Pages/About";
import Loading from "@/app/Components/Patterns/Loading";
import Network from "@/utils/Network";
type Props = { data: any; messages: string };

const AboutPage = ({ data, messages }: Props) => {
  if (!data) {
    return <Loading />;
  }

  return <About data={data} />;
};

export default AboutPage;

export async function getServerSideProps(context: any) {
  try {
    const res = await Network.run(null, "GET", "/about/aboutget", null);

    return {
      props: {
        data: res.data || [],
        messages: "success",
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        messages: "error",
      },
    };
  }
}
