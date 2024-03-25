import React from "react";
import { Question } from "@/_components";

const QuestionPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Question id={id}/>
    </>
  );
};

export default QuestionPage;
