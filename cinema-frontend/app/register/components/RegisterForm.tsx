'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import 'daisyui/dist/full.css'
import axios from 'axios';
import { redirect } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).required(),
});


function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


const onSubmit = async (data: FormData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/register', data);
    console.log(response.data);
    redirect('/login');
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center max-w-sm gap-3 p-6 mx-auto bg-white shadow-md rounded-xl">
      <div className="flex-1">
        <input {...register("firstName")} placeholder="First Name" className="w-full input input-bordered" />
        {errors.firstName && <p className="mt-1 text-xs text-red-500">This field is required</p>}
      </div>

      <div className="flex-1">
        <input {...register("lastName")} placeholder="Last Name" className="w-full input input-bordered" />
        {errors.lastName && <p className="mt-1 text-xs text-red-500">This field is required</p>}
      </div>

      <div className="flex-1">
        <input {...register("email")} placeholder="Email" className="w-full input input-bordered" />
        {errors.email && <p className="mt-1 text-xs text-red-500">This field is required</p>}
      </div>
      <div className="flex-1">
        <input {...register("username")} placeholder="Username" className="w-full input input-bordered" />
        {errors.username && <p className="mt-1 text-xs text-red-500">This field is required</p>}
      </div>

      <div className="flex-1">
        <input {...register("password")} type="password" placeholder="Password" className="w-full input input-bordered" />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">This field is required and must be at least 8 characters</p>
        )}
      </div>

      <div className="flex-1">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default RegisterForm;