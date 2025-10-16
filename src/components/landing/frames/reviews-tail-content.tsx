import { Avatar, Box, Typography } from "@mui/joy";
import Image from "next/image";
import React from "react";

export default function ReviewTailContent() {
  return (
    <>
      <Box className="flex justify-center items-center gap-3 md:gap-[24px]">
        <div className="flex items-center flex-col gap-2 text-center py-5">
          <div className="flex gap-0">
            <Image src="/images/download.svg" alt="star" width={24} height={24} />
            <Typography
               className="heading-large !font-semibold "
            >
              10K
              <Typography
               
                color="primary"
              >
                +
              </Typography>{" "}
            </Typography>{" "}
          </div>
          <div>
            <Typography className="body-large !font-normal ">
              10K+ Students on Clear Cutoff
            </Typography>{" "}
          </div>
        </div>
        <div className="flex items-center flex-col gap-2 text-center py-5">
          <div className="flex gap-0">
            <Image src="/images/medal.svg" alt="star" width={24} height={24} />
            <Typography
            className="heading-large !font-semibold "
              sx={{ maxWidth: 400 }}
            >
              #
              <Typography
               
                color="primary"
              >
                1
              </Typography>{" "}
            </Typography>{" "}
          </div>
          <div>
            <Typography className="body-large !font-normal ">
              Number #1 choice of TET Exams
            </Typography>{" "}
          </div>
        </div>
      </Box>
    </>
  );
}
