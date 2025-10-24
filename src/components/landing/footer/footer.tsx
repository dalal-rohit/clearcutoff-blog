"use client";

import dynamic from "next/dynamic";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useState } from "react";
import { footerData } from "@/data/footerData";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { replacePlaceholders } from "@/utils/utils";
const FloatingButton = dynamic(() => import("./floating-button"), {
  ssr: false,
});

export default function Footer() {
  const [contact, setContact] = useState<any>([]);
  const [social, setSocial] = useState<any>([]);
  const [pages, setPages] = useState<any>([]);
  const [Copyright, setCopyright] = useState<any>("");
 const { currentLang } = useLang();

  useEffect(() => {
    const data = footerData;

    setContact(data.contactSection);
    setSocial(data.socialSection);
    setPages(data.pages);
    setCopyright(data.copyrightSection);
  }, []);

  // Example conditional rendering:
  if (contact.length === 0 && social.length === 0 && pages.length === 0) {
    return (
      <Box
        sx={{ minHeight: "88px", backgroundColor: '#006bd1' }}
        className="w-full gap-3 flex flex-col justify-center items-center"
      ></Box>
    );
  }
  return (
    <>
      <footer id="footer">
        {/* Floating button */}
        <FloatingButton
        />
        <Box
          sx={{
            maxHeight: "123px",
            minHeight: "88px",
            backgroundColor: '#006bd1',
          }}
          className="w-full gap-2 py-1 flex flex-col justify-center items-center"
        >
          {/* Left Side: Copyright Grid */}
          <div className="flex gap-[24px] md:gap-[3.5rem] mx-auto">
            {contact.map((item, index) => (
              <div className="flex gap-1 items-center" key={item.title[currentLang]}>
                <a
                  href={
                    item.title.en === "Mail"
                      ? `mailto:${item.description}`
                      : item.title.en === "Contact Us"
                        ? `tel:${item.description}`
                        : "https://wa.me/7210708599"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-1 items-center"
                  key={item.title[currentLang]}
                >
                  <Image
                    src={item.icon.image}
                    alt={item.icon.alt}
                    width={20}
                    height={20}
                    className="cursor-pointer w-[20px] h-[20px]"
                  />
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: "white",
                      fontWeight: "500",
                    }}
                    className="text-center body-large !font-semibold"
                  >
                    <span className="hidden md:inline">{item.description}</span>
                    <span className="inline md:hidden">
                      {item.mobile[currentLang]}
                    </span>
                  </Typography>
                </a>
              </div>
            ))}
          </div>

          {/* Right Side: Privacy */}
          <div className="w-full flex gap-2 md:gap-0 lg:flex-row flex-col-reverse justify-between px-[20px] md:px-[80px]">
            <div className="min-w-[200px]">
              <Typography
                sx={{ cursor: "pointer", color: "white", fontWeight: "500" }}
                className="text-center body-small !font-normal"
              >
                {replacePlaceholders(Copyright[currentLang], { year: new Date().getFullYear()})}
              </Typography>
            </div>
            <div className="flex gap-6 w-auto justify-center">
              {pages.map((item, index) => (
                <Typography
                  key={`page-${index}`}
                  sx={{ cursor: "pointer", color: "white", fontWeight: "500" }}
                  className="text-center body-large !font-medium"
                >
                  <Link href={`/${item.url.replace(/^\/+/, "")}`}>
                    {item.title[currentLang]}
                  </Link>
                </Typography>
              ))}
            </div>
            <div className="flex justify-center gap-6 min-w-[200px]">
              {social.map((item) => (
                <a
                  key={item.title}
                  href={item.link ?? "#"} // add link if you have it
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Image
                    src={item.icon.image}
                    alt={item.icon.alt}
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px]"
                  />
                  {/* <span className="text-white text-sm font-medium hidden md:inline">
                    {item.title}
                  </span> */}
                </a>
              ))}
            </div>
            {/* </div> */}
          </div>
        </Box>
      </footer>
    </>
  );
}
