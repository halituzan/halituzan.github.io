import About from "@/app/Components/Main/Pages/About";
import React from "react";
import Config from "@/app/Configs/config";
import Network from "@/utils/Network";
import Loading from "@/app/Components/Patterns/Loading";
type Props = { data: any };

const AboutPage = ({ data }: Props) => {
  console.log(data);

  if (!data) {
    return <Loading />;
  }

  return <About data={data} />;
};

export default AboutPage;

export async function getServerSideProps(context: any) {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  try {
    const res = await Network.run(null, "GET", "/about/aboutget", null);

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
