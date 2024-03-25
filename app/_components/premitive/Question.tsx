"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button, Container } from "@/_components";
import { toast } from "react-toastify";
import Image from "next/image";
import { remove } from "@/_assets";
import { addQuestion, deleteQuestion, editQuestion } from "@/_services";

const Question: React.FC<{ id: string }> = ({ id }): React.JSX.Element => {
  const [formData, setFormData] = useState<{
    [key in string]: string | string[];
  }>({ question: "", options: [] });
  const [option, setOption] = useState("");
  const [showInp, setShowInp] = useState(false);
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });

  const query = useSearchParams();
  const router = useRouter();
  const dataString = query.get("data");
  const data: { [key in string]: string | string[] } = JSON.parse(dataString!);

  // handles question Onchange event
  const handleQonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, ["question"]: e.target.value }));
  };

  // handles option Onchange event
  const handleInpOptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  // handles option addition or removal
  const handleOption = (type: string, id: number | null) => {
    const newData = { ...formData };
    if (type === "add") {
      if (option.length < 1) {
        toast.error("Option field is empty");
        return;
      }

      if ((newData.options as string[])?.length === 5) {
        toast.error("Sorry, you cannot add more than five options");
        return;
      }

      (newData.options as string[]).push(option);
      setOption("");
    } else {
      newData.options = (newData.options as string[]).filter(
        (_, idx) => idx !== id
      );
    }
    setFormData(newData);
  };

  // Add question request
  const handleAddQuestion = async () => {
    const newData = { ...formData };

    if ((newData.options as string[])?.length < 3) {
      toast.error("Sorry, you should have a minimum three options");
      return;
    }
    setLoading((prev) => ({ ...prev, ["save"]: true }));
    const isSuccess = await addQuestion(formData);
    setLoading((prev) => ({ ...prev, ["save"]: false }));
    isSuccess && setFormData({ question: "", options: [] });
  };

  // Edit question request
  const handleEditQuestion = async () => {
    const newData = { ...formData };

    if ((newData.options as string[])?.length < 3) {
      toast.error("Sorry, you should have a minimum three options");
      return;
    }
    setLoading((prev) => ({ ...prev, ["save"]: true }));
    await editQuestion({ id, question: formData });
    setLoading((prev) => ({ ...prev, ["save"]: false }));
  };

  // Delete question request
  const handleDeleteQuestion = async () => {
    setLoading((prev) => ({ ...prev, ["delete"]: true }));
    const isSuccess = await deleteQuestion({ id });
    setLoading((prev) => ({ ...prev, ["delete"]: false }));
    isSuccess && router.push("/view");
  };

  useEffect(() => {
    dataString && setFormData(data);
  }, [dataString]);

  return (
    <Container>
      <div className="h-[90vh] w-full center flex-col">
        <input
          value={formData?.question}
          type="text"
          placeholder="Input Question"
          className="border-gray-300 px-2 py-3 md:w-[60%] w-full border mb-4"
          onChange={handleQonChange}
        />
        <div className="start flex-col md:w-[60%] w-full mb-2">
          {(formData?.options as string[])?.map((option: string, idx) => (
            <div key={option} className="between w-full mb-4">
              <label>
                <input type="radio" name="question-options" className="mr-2" />
                {option}
              </label>
              <Image
                width={20}
                height={20}
                alt="remove"
                src={remove}
                className="cursor-pointer"
                onClick={() => handleOption("rm", idx)}
              />
            </div>
          ))}
        </div>
        {showInp && (
          <div className="md:w-[60%] w-full mb-4">
            <input
              value={option}
              type="text"
              placeholder="Add Option"
              className="border-gray-300 p-1 md:w-[60%] w-full border mb-5 mr-2"
              onChange={handleInpOptChange}
            />
            <Button
              className="bg-gray-300 p-1 w-[50px] text-white"
              onClick={() => handleOption("add", null)}
            >
              Add
            </Button>
          </div>
        )}
        <div className="md:w-[60%] w-full start flex flex-wrap gap-2">
          <Button onClick={() => setShowInp(!showInp)}>Add Options</Button>
          <Button
            className="bg-green-300 rounded-[20px] p-2 w-[60px] text-white ml-2 hover:bg-green-400"
            onClick={() =>
              dataString ? handleEditQuestion() : handleAddQuestion()
            }
            loading={loading.save}
          >
            {dataString ? "Save" : "Add"}
          </Button>
          {dataString && (
            <Button
              className="bg-red-300 rounded-[20px] p-2 w-[65px] text-white ml-2 hover:bg-red-400"
              onClick={handleDeleteQuestion}
              loading={loading.delete}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Question;
