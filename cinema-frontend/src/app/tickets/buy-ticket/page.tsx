import { redirect } from "next/navigation";
import { isSeatTaken } from "../utils/isSeatTaken";

const Page = async ({
  params,
  searchParams
}:
{
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  if (searchParams === undefined || !searchParams.id) {
    redirect("/explore")
  }
  if(!searchParams.seat){
    redirect("/tickets"+searchParams.id)
  }
  const seatTaken = await isSeatTaken(searchParams.id, searchParams.seat);

  if(seatTaken){
    redirect("/tickets?id="+searchParams.id)
  }


  return (
    <div>
      <h1>Page</h1>
      seat {seatTaken ? "taken" : "free"}
      <p>Query parameters: {searchParams.seat}</p>
    </div>
  );
};


export default Page;