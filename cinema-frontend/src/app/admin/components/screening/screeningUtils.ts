import axios from "axios";
import { agent } from "@/utils/httpsAgent";
import { UUID } from "crypto";
import { api } from "@/utils/apiAddress";

export const addScreening = async (payload: {
  screening: {
    date: Date;
    movieTitle: string;
    auditoriumNumber: number;
  };
  token: string;
}) => {
  const { screening: screening, token } = payload;
  const response = await axios.post(
    api + "/api/v1/admin/screening/add",
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
  screening: { id: UUID };
  token: string;
}) => {
  const { screening, token } = payload;
  const response = await axios.delete(
    api + "/api/v1/admin/screening/delete/" + screening.id,
    {
      headers: { Authorization: "Bearer " + token },
      httpsAgent: agent,
    },
  );
  return response.data;
};

export const updateScreening = async (payload: {
  screening: {
    id: UUID;
    date: Date;
    movieTitle: string;
    auditoriumNumber: number;
  };
  token: string;
}) => {
  const { screening: screening, token } = payload;
  const response = await axios.put(
    api + "/api/v1/admin/screening/update",
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
