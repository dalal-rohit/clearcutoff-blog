"use client";
import CardWrap from "@/components/cards/card-wrap";
import QOption from "@/components/questions/q-option";
import React from "react";

export default function AssessmentQuestionBlock() {
  return (
    <div className="p-4">
      <div>
        <div className="heading-xlarge font-semibold mb-4">Assessment Questions</div>
      </div>

      <div>
        {/* question  */}
        <div className="heading-large font-semibold mb-2">
          Question: What is 2 + 2?
        </div>
        {/* options  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <CardWrap key={item} cursor="pointer">
              <QOption index={item} optiontext={"Option " + item} />
            </CardWrap>
          ))}
        </div>
        {/* answer  */}
        <div>
          <div className="heading-large font-semibold mb-2">Answer:</div>
          <div className="heading-small font-semibold mb-2">
            Option1: What is 2 + 2?
          </div>
          <div className="bg-softskyblue p-4 rounded-2xl">
            <div className="heading-large font-semibold mb-2">Explenation</div>
            <div className="body-large font-semibold mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
              dolorum veritatis blanditiis voluptatibus inventore hic quas
              eligendi nemo doloribus. Quis quam velit sit cum harum at alias
              quae voluptatibus aut.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
