"use client";
import React, { useState } from "react";
import { getToken } from "@/_services";
import { Button, Container } from "@/_components";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Auth: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleGetToken = async () => {
    if (!email) {
      toast.error("No input found");
      return;
    }
    setLoading(true);
    const isSuccess = await getToken({ email });
    setLoading(false);
    isSuccess && router.push("/view");
  };

  return (
    <Container>
      <div className="center flex-col h-[80vh]">
        <h1 className="text-2xl mb-2">To add questions you need a token</h1>
        <input
          type="text"
          placeholder="Input Email"
          className="border-gray-300 px-2 py-3 md:w-[60%] w-full border mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button loading={loading} onClick={handleGetToken}>
          Get Token
        </Button>
      </div>
    </Container>
  );
};

export default Auth;
