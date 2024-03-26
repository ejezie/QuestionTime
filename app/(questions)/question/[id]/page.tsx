import React from "react";
import { Question } from "@/_components";

export const metadata = {
  title: "QT Question",
};

const QuestionPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Question id={id}/>
    </>
  );
};

export default QuestionPage;
