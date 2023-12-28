"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "daisyui/dist/full.css";
import axios from "axios";
import { agent } from "@/utils/httpsAgent";

interface FormData {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "https://pi.dawidroszman.eu:8080/api/v1/auth/login",
        data,
        { httpsAgent: agent },
      );
      sessionStorage.setItem("token", response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center max-w-sm gap-4 p-6 shadow-md bg-stone-700 rounded-xl"
    >
      <div className="flex-1">
        <input
          {...register("username")}
          placeholder="Username"
          className="w-full input input-bordered"
        />
        {errors.username && (
          <p className="mt-1 text-xs text-red-500">This field is required</p>
        )}
      </div>

      <div className="flex-1">
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full input input-bordered"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">
            This field is required and must be at least 8 characters
          </p>
        )}
      </div>

      <div className="flex-1">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
