"use client";

import useIsMobile from "@/hooks/isMobile";
// import { logAmplitudeEvent } from "@/services/analytics";
// import { useAuthModal } from "@/store/authModalStore";
import { StarIcon } from "@heroicons/react/16/solid";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Image from "next/image";
import React from "react";

export default function ReviewMainCard() {

  const stars = [3, 4, 5, 4, 3]; // star sizes

  const handleClick = async () => {
    // openModal({ type: "register" });
    // await logAmplitudeEvent("Authentication Initiated", {
    //   initial_intent: "register",
    //   element_location: "hero-section",
    //   element_type: "button",
    // });
  };
  return (
    <>
      <Box className="max-w-[324px] md:max-w-[364px] gap-6 max-h-[358px] w-full h-full bg-white border-2 border-gray-200 rounded-[24px] z-10  flex flex-col justify-center items-center px-6 py-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-center items-end">
            <Image
              src="/images/Flourish-left.svg"
              alt="Reviewer"
              width={7}
              height={7}
              className="w-auto h-auto -ml-2"
            />

            <div>
              {/* Avatars Section */}
              <div className="flex justify-center items-end -space-x-4 mb-1">
                <Image
                  src="https://cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com/images/icon-female-user.png"
                  alt="Reviewer 1"
                  width={40}
                  height={40}
                  priority
                  className="rounded-full border-2 border-[#f1f5fa] shadow-md object-cover"
                />

                <Image
                  src="https://cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com/images/icon-male-user.png"
                  alt="Reviewer 2"
                  width={56}
                  height={56}
                  priority
                  className="rounded-full border-4 absolute border-[#f1f5fa] -top-2 shadow-lg relative z-10 object-cover"
                />

                <Image
                  src="https://cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com/images/icon-female-user.png"
                  alt="Reviewer 3"
                  width={40}
                  height={40}
                  priority
                  className="rounded-full border-2 border-[#f1f5fa] shadow-md object-cover"
                />
              </div>
              {/* Stars */}
              <div className="flex justify-center items-end -mt-2">
                {stars.map((s, i) => (
                  <StarIcon
                    key={i}
                    className={`fill-[#0083ff] w-${s} h-${s}`}
                  />
                ))}
              </div>
            </div>
            <Image
              src="/images/Flourish-right.svg"
              alt="Reviewer"
              width={7}
              height={7}
              className="w-auto h-auto -ml-2"
            />
          </div>

          {/* Rating Text */}
          <div className="body-large !font-semibold">
            <p className=" text-center text-[#0083ff] mb-2">4.9</p>
            <p className="text-black">from 1K+ reviews</p>
          </div>
        </div>
        <div>
          <Button
            size={"lg"}
            onClick={handleClick}
            className="bg-[#0083ff]"
          >
            Sign Up to Improve Marks
          </Button>
        </div>
      </Box>
    </>
  );
}
