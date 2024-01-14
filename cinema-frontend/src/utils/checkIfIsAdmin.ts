import axios from "axios";
import { agent } from "./httpsAgent";
import { api } from "./apiAddress";

export const checkIfIsAdmin = async (token: string) => {
  try {
    const response = await axios.get(
      api+"/api/v1/user/is-admin",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        httpsAgent: agent,
      },
    );
    const isAdmin = response.data;
    return isAdmin;
  } catch (error) {
    console.log(error);
    window.location.href = "/login";
  }
};
