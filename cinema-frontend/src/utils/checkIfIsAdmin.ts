import axios from "axios";
import { agent } from "./httpsAgent";

export const checkIfIsAdmin = async (token: string) => {
  try {
    const response = await axios.get(
      "http://pi.dawidroszman.eu:8080/api/v1/user/is-admin",
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
