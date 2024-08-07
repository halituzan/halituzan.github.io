import About from "@/app/Components/Main/Pages/About";
import React from "react";
import Config from "@/app/Configs/config";
import Network from "@/utils/Network";
type Props = { data: any };

const AboutPage = ({ data }: Props) => {
  return <About data={data} />;
};

export default AboutPage;

export async function getServerSideProps(context: any) {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  try {
    const res = await Network.run(
      null,
      "GET",
      "/about/aboutget?id=" + userId,
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
