import axios from "axios";
import { agent } from "./httpsAgent";

const fetchUser = async (token: String) => {
  try{

  const userData = await axios.get(
    "https://pi.dawidroszman.eu:8080/api/v1/user/get-info",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      httpsAgent: agent,
    },
  );

  return userData.data;
  } catch {
    return false;
  }

};

export default fetchUser;
