import React from "react";

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const Container:React.FC<ContainerProps> = ({ children, className }): React.JSX.Element => {
  return (
    <div className={`w-full ${className}`}>
      <div className="px-[4vw] max-w-[1440px] mr-auto ml-auto">{children}</div>
    </div>
  );
};

export default Container;