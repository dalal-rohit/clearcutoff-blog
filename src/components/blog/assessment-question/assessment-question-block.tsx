"use client";
import CardWrap from "@/components/cards/card-wrap";
import QOption from "@/components/questions/q-option";
import React from "react";
import { limitWords } from "@/utils/text/textLimit";
import RegisterButton from "@/components/buttons/register-button";
import { useParams } from "next/navigation";
import StarBadge from "@/components/ui/badge/star-badge";
import DetailsSectionCard from "./details-section-card";
import QuestionCard from "../ui/question-card";
import { formatToSlug } from "@/utils/slugify";
import removeMd from "remove-markdown";

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

const options = [
  "A",
  "B",
  "C",
  "D",
]

export default function AssessmentQuestionBlock({ data }: { data: AssessmentQuestion[] }) {
  const [showExplanation, setShowExplanation] = React.useState<{ [key: number]: boolean }>({});
  const params = useParams<{ questionId: string }>();

  const selectedQuestion = data?.find((item: AssessmentQuestion) => item.id === parseInt(params?.questionId.split("-").pop() || ""));
  const otherQuestions = data?.filter((item: AssessmentQuestion) => item.id !== parseInt(params?.questionId.split("-").pop() || ""));

  return (

    <div className="space-y-5">
      <div className="flex flex-col gap-4 p-3  bg-white">
        <div className="flex items-center justify-between">
          <span className="heading-medium !font-semibold">Question</span>
          <div className='flex items-center gap-1 text-[#00a251]'>
            <StarBadge size={20} color="#00a251" />
            Easy
          </div>
        </div>
        <div>
           <p className="body-large !font-normal" >
                {removeMd(selectedQuestion?.question_text ?? "")}
              </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { text: selectedQuestion?.option_1_text, img: selectedQuestion?.option_1_image_url },
            { text: selectedQuestion?.option_2_text, img: selectedQuestion?.option_2_image_url },
            { text: selectedQuestion?.option_3_text, img: selectedQuestion?.option_3_image_url },
            { text: selectedQuestion?.option_4_text, img: selectedQuestion?.option_4_image_url },
          ].map((opt, idx) => (
            <CardWrap bgcolor="white" key={idx + 1} cursor="pointer">
              <QOption index={idx + 1} optiontext={opt.text} imgurl={opt.img || undefined} />
            </CardWrap>
          ))}

        </div>

      </div>

      <div className="bg-white p-3">
        <DetailsSectionCard Labels={[
          { lable: "Exam", value: '2022' },
          { lable: "Level/Paper", value: "" },
          { lable: "State", value: "" },
        ]} sources={[
          { lable: "Chapter", value: "" },
          { lable: "Topic", value: "" },
        ]}
          solveTime={"12"} />
      </div>

      <div className="bg-white space-y-4 pt-3">
        <div className='grid grid-cols-8 items-center gap-2 px-3'>
          <div className='col-span-4 heading-medium !font-semibold surface-text-gray-normal'>Correct Answer</div>

          <div className='col-span-4 justify-self-end'>
            <span className='body-large !font-semibold text-brand px-3 py-1 bg-[#006bd1]/10 rounded-md'>Option {options[selectedQuestion?.correct_option || 0]}</span>
          </div>

        </div>
        <div>
          <div className="relative p-3 bg-[#F3F7FD] text-black leading-7 text-lg rounded">

            <div className="space-y-4">
              <div className="heading-medium !font-semibold">Explanation</div>
              {/* TEXT */}


              <p className="body-large !font-normal" >
                {removeMd(limitWords(selectedQuestion?.explanation || "", 70))}
              </p>

            </div>


            {/* 50% OVERLAY */}
            <span className="absolute right-0 bottom-0 w-full h-1/2 bg-[#F3F7FD]/90 pointer-events-none"></span>

            {/* BUTTON ON OVERLAY */}
            <button
              className="
                  absolute left-1/2 bottom-4 
                  -translate-x-1/2 -translate-y-1/2
                  z-20 
                "
            >
              <RegisterButton size="lg" isFull />
            </button>

          </div>
        </div>
      </div>

      <div className="bg-white p-3 space-y-4">
        <div className='flex justify-between item-center '>
          <div className='heading-small !font-semibold surface-text-gray-normal'>Similar Questions from REET Exam - Paper 1 - Year 2018</div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4">
            {otherQuestions?.map((question: any, index: any) => {
              const plain = question.question_text?.replace(/<[^>]*>/g, "") || "";
              const snippet = limitWords(plain, 25);
              return (
                <QuestionCard
                  key={index}
                  q_no={index + 1}
                  index={index}
                  path={`/question/${formatToSlug(limitWords(question.question_text, 4))}-${question.id}`}
                  questionText={snippet}
                />
              )
            })}
          </div>
        </div>

      </div>


    </div>
  );
}
