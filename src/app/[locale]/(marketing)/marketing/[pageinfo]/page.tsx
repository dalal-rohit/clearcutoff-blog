"use client";

import { use } from "react"; // 👈 new in React 18.3
import { useEffect, useState } from "react";
import { pagesData } from "@/data/pagesData";
import Footer from "@/components/landing/footer/footer";
import MainContainer from "@/components/main-container";

export default function DynamicPage({
  params,
}: {
  params: Promise<{ pageinfo: string }>;
}) {
  const { pageinfo } = use(params); // 👈 unwrap the Promise
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const data = pagesData[pageinfo];
        console.log(data);
        setPage(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [pageinfo]);

  // useEffect(() => {
  //   async function fetchPage() {
  //     try {
  //       const data = await getMiscellanousPages(pageinfo);
  //       setPage(data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchPage();
  // }, [pageinfo]);

  // if (loading) return <p>Loading...</p>;
  if (!page) return null;

  return (
    <>
      {/* <SectionBlock
        padding="custom"
        margin="custom"
        className="px-6 md:px-[210px] py-[32px]"
      > */}
        {/* {page?.title} */}
        <MainContainer maxWidth="max-w-[900px]">
        <p className="heading-large !font-semibold surface-text-gray-normal">{page?.title}</p>
        <div
          className=" body-medium custom" // 'prose' from Tailwind Typography is great for this
          dangerouslySetInnerHTML={{
            __html: page?.content,
          }}
        />
        </MainContainer>
        {/* <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
        <RichText data={page.content} /> */}
      {/* </SectionBlock> */}
       {/* footer section  */}
      {/* <SectionBlock padding="custom" margin="custom" className=""> */}
        <Footer />
      {/* </SectionBlock> */}
    </>
  );
}
