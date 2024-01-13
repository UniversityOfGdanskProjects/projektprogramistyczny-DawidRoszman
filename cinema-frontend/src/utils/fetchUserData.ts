import axios from "axios";
import { agent } from "./httpsAgent";
import { api } from "./apiAddress";

const fetchUser = async (token: String) => {
  try {
    const userData = await axios.get(
      api+"/api/v1/user/get-info",
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
