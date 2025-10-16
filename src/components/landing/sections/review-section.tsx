"use client";
import React, { useEffect } from "react";
import { Box } from "@mui/joy";
import { reviewSection } from "@/data/DummyData";
import { useLang } from "@/hooks/useLang";
import CustomizableHeader from "@/components/customizable-header";
import InfiniteScroll from "../EmblaCarousel";
import ReviewCard from "../review-card";
import ReviewMainCard from "../review-main-card";
import ReviewTailContent from "../frames/reviews-tail-content";
import { useGlobalDataStore } from "@/store/useGlobalDataStore";

export default function ReviewSection() {
  const [reviews1, setReviews1] = React.useState([]);
  const [reviews2, setReviews2] = React.useState([]);
  const { reviews } = useGlobalDataStore();

  useEffect(() => {
    const allReviews = reviews.reviews || [];
    const midpoint = Math.ceil(allReviews.length / 2);
    // setReviews1(allReviews.slice(0, 5));
    // setReviews2(allReviews.slice(5, 10));
    setReviews1(allReviews.slice(0, midpoint));
    setReviews2(allReviews.slice(midpoint));
  }, []);

  console.log("reviews", reviews);
  console.log("reviews1", reviews1);
  console.log("reviews2", reviews2);

  const { currentLang } = useLang();
  const courseName = "HTET";

  return (
    <>
      <div
        className="
          py-6 sm:py-6 md:py-8
          mx-auto w-full
        "
      >
        <div className="space-y-[32px] md:space-y-[48px]">
          <CustomizableHeader
            eyebrow={reviews?.eyebrow}
            heading={reviews?.heading}
            // highlightText={reviews.highlightText}
            subheading={reviews?.subheading}
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            subheadingColor="text-gray-600"
            alignment="text-center"
            headingClasses="!mb-4"
            headingSize="display-medium"
          />
          {/* <EdgeHighlight
            leftColor="from-gray-200/60"
            rightColor="from-gray-200/60"
            width="w-[100px]"
          > */}
          <Box className="flex flex-col justify-center items-center gap-[24px]">
            {/* <div className="flex gap-[24px] "> */}
            <InfiniteScroll
              direction="right"
              speed={300} // seconds
            >
              {" "}
              {Array(5)
                .fill(null)
                .flatMap((_, i) =>
                  reviews1.map((rev, index) => (
                    <div className="scroll-item" key={`${i}-${index}`}>
                      <h1>ksfjasjflajsldfjaskldfjasklfjasklfj</h1>
                      <ReviewCard
                        profile={rev.profile}
                        name={rev}
                        field={rev.field}
                        review={rev}
                        exam={courseName ?? "HTET"}
                      />
                    </div>
                  ))
                )}
            </InfiniteScroll>
            {/* </div> */}
            {/* <div className="flex gap-[24px] "> */}
            <InfiniteScroll
              direction="left"
              speed={300} // seconds
            >
              {" "}
             
              {Array(5)
                .fill(null)
                .flatMap((_, i) =>
                  reviews2.map((review, index) => (
                    <div className="scroll-item" key={`${i}-${index}`}>
                       <h1>sjfsidi</h1>
                      {/* <ReviewCard {...review} exam={courseName ?? "HTET"} /> */}
                    </div>
                  ))
                )}
            </InfiniteScroll>
            {/* {reviews2.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))} */}
            {/* </div> */}
          </Box>
          {/* </EdgeHighlight> */}
          {/* <Box className="flex -mt-50 md:-mt-50 flex-col justify-center items-center gap-[24px]">
            <ReviewMainCard />
          </Box> */}
          <Box className="px-10">
            <ReviewTailContent />
          </Box>
        </div>
      </div>
    </>
  );
}
