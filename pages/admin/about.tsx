import AboutPage from "@/app/AdminComponents/About/AboutPage";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="flex w-full h-full">
      <AboutPage />
    </div>
  );
};

export default About;

About.displayName = "admin";
