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
import { Button } from "@mui/joy";

interface AssessmentQuestion {
  correct_option: number;
  createdAt: string;
  exam_instance_id: string;
  explanation: string;
  exam_instance_id_b: string;
  stage_id_b: string;
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
  chapter: Chapter;
  topic: Topic;
}

const options = ["", "A", "B", "C", "D"];

export default function AssessmentQuestionBlock({ data }: { data: AssessmentQuestion[] }) {
  const [showExplanation, setShowExplanation] = React.useState<{ [key: number]: boolean }>({});
  const params = useParams<{ questionId: string }>();
  const [showDetails, setShowDetails] = React.useState(false);

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
          { lable: "Exam", value: selectedQuestion?.stage_id_b.split("_")[0] || "" },
          { lable: "Level/Paper", value: selectedQuestion?.stage_id_b || "" },
          { lable: "State", value: "" },
        ]} sources={[
          { lable: "Chapter", value: selectedQuestion?.chapter?.name || "" },
          { lable: "Topic", value: selectedQuestion?.topic?.name || "" },
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
              
              {!showDetails ? (
                <p className="body-large !font-normal" >
                  {removeMd(limitWords(selectedQuestion?.explanation || "", 70))}
                  <span onClick={() => setShowDetails(!showDetails)} className="ml-2 mt-5 body-medium cursor-pointer !font-normal text-brand px-3 py-0.5 bg-[#006bd1]/10 rounded-md">{showDetails ? "Read Less" : "Read More"}</span>

                </p>
              ) : (
                <p className="body-large !font-normal" >
                  {removeMd(selectedQuestion?.explanation || "")}
                  <span onClick={() => setShowDetails(!showDetails)} className="ml-2 mt-5 body-medium cursor-pointer !font-normal text-brand px-3 py-0.5 bg-[#006bd1]/10 rounded-md">{showDetails ? "Read Less" : "Read More"}</span>

                </p>
              )}


            </div>

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
              const slug = question?.slug ? question.slug : formatToSlug(limitWords(question.question_text, 4));

              return (
                <QuestionCard
                  key={index}
                  q_no={index + 1}
                  index={index}
                  path={`/question/${slug}-${question.id}`}
                  questionText={snippet}
                  source={question?.chapter?.name}
                  chapter_name={question?.chapter?.name}
                  topic_name={question?.topic?.name}
                />
              )
            })}
          </div>
        </div>

      </div>


    </div>
  );
}
