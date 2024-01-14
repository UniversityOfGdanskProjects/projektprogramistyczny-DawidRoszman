import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Screening } from "@/types/types";
import { api } from "@/utils/apiAddress";
import Screenings from "./components/Screenings";

export default async function Explore() {
  const data = await axios.get(api + "/api/v1/cinema/screenings", {
    httpsAgent: agent,
  });
  const screenings: Screening[] = data.data;

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-base-100">
        <NavBar />
        <section className="p-5">
          <Screenings screenings={screenings} />
        </section>
      </div>
    </Suspense>
  );
}
