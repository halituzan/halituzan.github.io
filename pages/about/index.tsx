import About from "@/app/Components/Main/Pages/About";
import React from "react";
import Config from "@/app/Configs/config";
type Props = { data: any };

const AboutPage = ({ data }: Props) => {
  return <About data={data} />;
};

export default AboutPage;

export async function getServerSideProps(context: any) {
  if (!Config) {
    return {
      props: {},
    };
  }
  try {
    return {
      props: {
        data: Config || [],
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
