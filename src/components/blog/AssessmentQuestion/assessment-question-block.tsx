"use client";
import CardWrap from "@/components/cards/card-wrap";
import QOption from "@/components/questions/q-option";
import React, { useState } from "react";

export default function AssessmentQuestionBlock() {
  return (
    <div className="p-4">
      <div>
        <div className="text-2xl font-bold mb-4">Assessment Questions</div>
      </div>

      <div>
        <div className="text-xl font-semibold mb-2">
          Question: What is 2 + 2?
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <CardWrap key={item} cursor="pointer">
              <QOption index={item} optiontext={"Option " + item} />
            </CardWrap>
          ))}
        </div>
      </div>
    </div>
  );
}
