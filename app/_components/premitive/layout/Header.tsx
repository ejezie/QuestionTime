"use client";
import React from "react";
import { Container } from "..";
import Image from "next/image";
import { logo } from "@/_assets";
import Link from "next/link";
import { Button } from "@/_components";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = (): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = () => {
    const token = localStorage.getItem("token");
    token ? router.push("/question/new") : router.push("/auth");
  };

  return (
    <div className="w-full h-[4rem] bg-blue-300 center">
      <Container>
        <div className="w-full between">
          <Link href={"/"} className="center w-[50px] shadow-s">
            <Image
              width={30}
              height={30}
              alt=""
              src={logo}
              className="rounded-[50%] mr-1 cursor-pointer"
            />
            <h3 className="font-[900] text-xl text-white text-left ">
              QT
            </h3>
          </Link>
          {pathname.includes("view") && (
            <Button onClick={isAuth}>Add new question</Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
