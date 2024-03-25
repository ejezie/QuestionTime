import React from "react";
import { Modal, Question } from "@/_components";

const QuestionParallelPage = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  return (
    <Modal>
      <Question id={id} />
    </Modal>
  );
};

export default QuestionParallelPage;
