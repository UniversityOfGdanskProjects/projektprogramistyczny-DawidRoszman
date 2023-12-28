import React from "react";
import NavMenu from "@/components/NavMenu";
import axios from "axios";
import { agent } from "@/utils/httpsAgent";

const page = async () => {
  const movies = await axios.get(
    "https://pi.dawidroszman.eu:8080/api/v1/cinema",
    { httpsAgent: agent },
  );
  return (
    <div>
      <NavMenu />
      {movies.data}
    </div>
  );
};

export default page;
