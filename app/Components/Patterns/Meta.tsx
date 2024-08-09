import Head from "next/head";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  keywords?: object[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

const Meta = ({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
}: Props) => {
  const keywordList = keywords?.map((i: any) => {
    return i.name;
  });
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' content={description?.slice(0, 150)} />
        <meta property='og:title' content={ogTitle?.slice(0, 55)} />
        <meta
          property='og:description'
          content={ogDescription?.slice(0, 150)}
        />
        {ogImage && <meta property='og:image' content={ogImage} />}
        {keywordList.length > 0 && (
          <meta name='keywords' content={keywordList.join()} />
        )}
      </Head>
    </>
  );
};

export default Meta;
