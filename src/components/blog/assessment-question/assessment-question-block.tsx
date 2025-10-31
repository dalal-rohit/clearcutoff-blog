"use client";
import CardWrap from "@/components/cards/card-wrap";
import QOption from "@/components/questions/q-option";
import MainContainer from "@/components/main-container";
import React from "react";
import { limitWords } from "@/utils/text/textLimit";
import Image from "next/image";
import Link from "next/link";
import RegisterButton from "@/components/buttons/register-button";

interface AssessmentQuestion {
  correct_option: number;
  createdAt: string;
  exam_instance_id: string;
  explanation: string;
  id: number;
  label_id: string;
  option_1_image_url: string;
  option_1_text: string;
  option_2_image_url: string;
  option_2_text: string;
  option_3_image_url: string;
  option_3_text: string;
  option_4_image_url: string;
  option_4_text: string;
  question_id: string;
  question_image_url: string;
  question_number: string;
  question_text: string;
  section_id: string;
  stage_id: string;
  updatedAt: string;
}

export default function AssessmentQuestionBlock({ data }: { data: AssessmentQuestion[] }) {
  const [showExplanation, setShowExplanation] = React.useState<{ [key: number]: boolean }>({});
  return (
    <MainContainer maxWidth="max-w-[900px]">

      <div className="p-4">
        <div>
          <div className="heading-xlarge font-semibold mb-4">Assessment Questions</div>
        </div>

        {data?.map((item: AssessmentQuestion) => (
          <div key={item.id}>
            {/* question  */}
            <div className="body-large font-semibold mb-2">
              {item.id ? `Q${item.id}: ` : ""}
              <span dangerouslySetInnerHTML={{ __html: item.question_text }} />
            </div>
            {item.question_image_url && (
              <div className="mb-4">
                <Image
                  src={item.question_image_url}
                  alt="Question"
                  width={800}
                  height={600}
                  className="w-auto h-auto max-w-full rounded"
                />
              </div>
            )}
            {/* options  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { text: item.option_1_text, img: item.option_1_image_url },
                { text: item.option_2_text, img: item.option_2_image_url },
                { text: item.option_3_text, img: item.option_3_image_url },
                { text: item.option_4_text, img: item.option_4_image_url },
              ].map((opt, idx) => (
                <CardWrap key={idx + 1} cursor="pointer">
                  <QOption index={idx + 1} optiontext={opt.text} imgurl={opt.img || undefined} />
                </CardWrap>
              ))}
            </div>
            {/* answer  */}
            <div>
              <div className="body-large font-semibold mb-2">Answer:</div>
              <div className="body-large font-semibold mb-2">
                {(() => {
                  const options = [
                    item.option_1_text,
                    item.option_2_text,
                    item.option_3_text,
                    item.option_4_text,
                  ];
                  const c = Math.max(1, Math.min(4, item.correct_option));
                  const text = options[c - 1];
                  return `Option ${c}: ${text}`;
                })()}
              </div>
              <div className="bg-softskyblue p-5 rounded-2xl shadow-lg backdrop-blur-md ring-1 ring-blue-100/60">
                <div className="body-large font-semibold mb-3">Explanation:</div>
                <div className="body-large font-semibold mb-4 whitespace-pre-wrap">
                  {showExplanation[item.id] ? item.explanation : limitWords(item.explanation, 70)}
                  {" "}
                  <button
                    className="body-large font-semibold cursor-pointer text-brand"
                    onClick={() => setShowExplanation((s) => ({ ...s, [item.id]: !s[item.id] }))}
                  >
                    {showExplanation[item.id] ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="flex justify-center">
                  <RegisterButton isFull={true} text="SignUp to Know More" />

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}
