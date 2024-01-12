import axios from "axios";
import { agent } from "@/utils/httpsAgent";
import { Screening } from "@/types/types";

export const addScreening = async (payload: {
  screening: Screening;
  token: string;
}) => {
  const { screening: screening, token } = payload;
  const response = await axios.post(
    "http://pi.dawidroszman.eu:8080/api/v1/admin/add-screening",
    screening,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      httpsAgent: agent,
    },
  );
  return response.data;
};

export const removeScreening = async (payload: {
  screening: Screening;
  token: string;
}) => {
  const { screening, token } = payload;
  const response = await axios.delete(
    "http://pi.dawidroszman.eu:8080/api/v1/admin/delete-screening/" +
      screening.id,
    {
      headers: { Authorization: "Bearer " + token },
      httpsAgent: agent,
    },
  );
  return response.data;
};

export const modifyScreening = async (payload: {
  screening: Screening;
  token: string;
}) => {
  const { screening: screening, token } = payload;
  const response = await axios.put(
    "http://pi.dawidroszman.eu:8080/api/v1/admin/update-screening",
    screening,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      httpsAgent: agent,
    },
  );
  return response.data;
};
