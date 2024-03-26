"use client";
import React, { useEffect, useState } from "react";
import { edit, folder } from "@/_assets";
import { Container } from "@/_components";
import Image from "next/image";
import Link from "next/link";
import { getQuestions } from "@/_services";
import Spinner from "@/_components/widgets/Spinner";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "QT view",
};

const ViewPage = () => {
  const [data, setData] = useState<{
    [key in string]: { [key in string]: string | string[] };
  }>({});
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    (async function () {
      const data = await getQuestions();
      setData(data);
      setLoading(false);
    })();
  }, [pathname]);

  return (
    <Container className="py-10 ">
      {data && Object.keys(data).length > 0 ? (
        <div className="flex flex-wrap w-full gap-10">
          {Object.keys(data).map((key, idx) => (
            <div
              key={idx + key}
              className="w-full md:w-[47%] p-5 bg-blue-100 rounded-xl slide-up"
            >
              <Link
                href={`/question/${key}?data=${encodeURIComponent(
                  JSON.stringify(data[key])
                )}`}
                className="w-full between pb-1 mb-2 cursor-pointer border-b-2 border-white"
              >
                <h2 className="text-xl">{data[key].question}</h2>
                <Image width={20} height={20} alt="down" src={edit} />
              </Link>
              <div className="">
                {(data[key].options as string[]).map((option) => (
                  <div key={option}>
                    <label>
                      <input
                        type="radio"
                        name="question-options"
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <div role="status">
          <Spinner />
        </div>
      ) : (
        <div className="center flex-col h-[70vh] w-full">
          <Image width={200} height={200} src={folder} alt="folder" />
          <h1 className="md:text-4xl text-3xl text-blue-500">
            No Questions Yet
          </h1>
        </div>
      )}
    </Container>
  );
};

export default ViewPage;
