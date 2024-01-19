import GoBackBtn from "@/components/GoBackBtn";
import React from "react";

const RaportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GoBackBtn />
      {children}
    </>
  );
};

export default RaportLayout;
