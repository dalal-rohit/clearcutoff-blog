import AssessmentQuestionBlock from "@/components/blog/assessment-question/assessment-question-block";
import OthersExamsSection from "@/components/blog/assessment-question/others-exams-section";
import SimilarQuestionsSection from "@/components/blog/assessment-question/similar-questions-section";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";

export default function page() {
  return (
    <div>
      <MainBreadcrumbs />
      <AssessmentQuestionBlock />
      <AssessmentQuestionBlock />
      <SimilarQuestionsSection />
      <OthersExamsSection />
    </div>
  );
}
