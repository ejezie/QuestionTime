"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }): React.JSX.Element => {
  const router = useRouter();
  return createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-screen z-20 flex items-center justify-center`}
    >
      <div
        className={`fixed bg-black/50 -z-10 top-0 right-0 w-full h-screen  text-white`}
      />
      <div
        className="absolute top-0 text-white cursor-pointer"
        onClick={() => router.back()}
      >
        X
      </div>
      <div
        className="bg-white w-[90%] slide-down"
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
