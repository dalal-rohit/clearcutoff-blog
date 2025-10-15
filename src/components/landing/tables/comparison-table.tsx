import { Box } from "@mui/joy";
import Image from "next/image";
import React from "react";

type Props = {
  comparison?: Item[];
  coaching_center?: Item[];
  clear_cutoff?: Item[];
};

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 flex-shrink-0 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 flex-shrink-0 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function ComparisonTable({
  comparison,
  coaching_center,
  clear_cutoff,
}: Props) {


  return (
    <>
      <div className="w-full flex md:justify-center  overflow-x-auto">
        <Box className="min-w-[450px] md:max-w-[950px] flex items-start justify-center bg-[#f8fafc] rounded-[16px] px-2 py-3">
          <div className="flex w-full mx-auto rounded-xl">
            {/* Column 1: Comparison Features */}
            <div className="flex-[1_1_30%] min-w-[150px] ">
              <h2 className="heading-large text-center font-semibold text-gray-700 mb-4 h-[42px] flex items-end justify-center">
                Comparison
              </h2>
              <div className="flex-[1_1_30%] min-w-[150px] bg-white pl-2 rounded-l-xl py-2">
                {comparison?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-left min-h-15 text-gray-700  px-1  lg:px-6 heading-medium !font-semibold  ${
                      index === 0 ? "border-0" : "border-t border-gray-200"
                    }`}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Coaching Center */}
            <div className="flex-[1_1_35%] min-w-[180px]">
              <h2 className="heading-large text-center font-semibold text-gray-700 mb-4 h-[42px] flex items-end justify-center">
                Coaching Center
              </h2>
              <div className="flex-[1_1_35%] min-w-[180px] bg-white py-2">
                {coaching_center?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 min-h-15 text-gray-700 px-1 lg:px-6 !font-normal heading-small 
                      ${index === 0 ? "border-0" : "border-t border-gray-200"}`}
                  >
                    <CrossIcon />
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{
                        __html: item.text || "",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: ClearCutoff */}
            <div className="flex-[1_1_35%] min-w-[200px] rounded-xl outline-4 outline-blue-500 relative ">
              <div className="mb-[10px] flex items-end justify-center">
                <Image
                  src="/images/main-logo.svg"
                  alt="ClearCutoff Logo"
                  width={256}
                  height={48}
                  className="h-[48px] w-[190px] object-contain"
                  priority
                />{" "}
              </div>
              <div className="flex-[1_1_35%] min-w-[200px] bg-white rounded-r-xl py-2 pr-2 -ml-px">
                {clear_cutoff?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 min-h-15 text-gray-700 px-1 lg:px-6 !font-normal heading-small ${
                      index === 0 ? "border-0" : "border-t border-gray-200"
                    }`}
                  >
                    <CheckIcon />
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{
                        __html: item.text || "",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
