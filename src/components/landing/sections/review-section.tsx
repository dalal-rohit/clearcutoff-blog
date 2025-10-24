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
import { useGlobalDataStore } from "@/store/blog/useGlobalDataStore";

export default function ReviewSection() {
  const [reviews1, setReviews1] = React.useState<ReviewItem[]>([]);
  const [reviews2, setReviews2] = React.useState<ReviewItem[]>([]);
  const { reviews } = useGlobalDataStore();

  if (!reviews) return null;

  useEffect(() => {
    const allReviews = reviews?.reviews || [];
    const midpoint = Math.ceil(allReviews.length / 2);
    setReviews1(allReviews.slice(0, midpoint));
    setReviews2(allReviews.slice(midpoint));
  }, [reviews]);


  return (
    <>
      <div
        id="reviews"
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
                  reviews1?.map((review, index) => {
                    return (
                      <div className="scroll-item" key={`${i}-${index}`}>
                        <ReviewCard
                          profile={review?.profile}
                          name={review?.name}
                          profession={review?.profession}
                          review={review?.review}
                          examName={"HTET"}
                          reviewHighlight={review?.reviewHighlight}
                        />
                      </div>
                    );
                  })
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
                  reviews2?.map((review, index) => {
                    return (
                      <div className="scroll-item" key={`${i}-${index}`}>
                        <ReviewCard
                          profile={review?.profile}
                          name={review?.name}
                          profession={review?.profession}
                          review={review?.review}
                          examName={"HTET"}
                          reviewHighlight={review?.reviewHighlight}
                          gender={review?.gender}
                        />
                      </div>
                    );
                  })
                )}
            </InfiniteScroll>
          </Box>
          {/* </EdgeHighlight> */}
          <Box className="flex -mt-50 md:-mt-50 flex-col justify-center items-center gap-[24px]">
            <ReviewMainCard />
          </Box>
          <Box className="px-10">
            <ReviewTailContent />
          </Box>
        </div>
      </div>
    </>
  );
}
