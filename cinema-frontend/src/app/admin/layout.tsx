"use client";
import React, { useEffect, useState } from "react";
import { useToken } from "../components/TokenContext";
import { checkIfIsAdmin } from "@/utils/checkIfIsAdmin";
import Loading from "@/components/Loading";
import GoBackBtn from "@/components/GoBackBtn";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const token = useToken();
  useEffect(() => {
    if (token === null || token.token === "" || token.token === null) {
      return;
    }
    const checkIfIsValid = async () => {
      if (token === null) return;
      if (token.token === null) return;
      const isAdmin = await checkIfIsAdmin(token.token);
      setIsAdmin(isAdmin);
    };
    checkIfIsValid();
  }, [token]);

  if (isAdmin === null || token === null || token.token === null) {
    return <Loading />;
  }

  if (!isAdmin) {
    return (
      <div className="text-5xl text-center">
        Unauthorized
        <br /> <GoBackBtn />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AdminLayout;
