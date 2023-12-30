"use client";
import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().min(2, "Too Short!").required("Required"),
});

function Login() {
  if (sessionStorage.getItem("token") !== null) {
    return redirect("/explore");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const tokenRequest = await axios.post(
            "https://pi.dawidroszman.eu:8080/api/v1/auth/login",
            values,
            { httpsAgent: agent },
          );
          sessionStorage.setItem("token", tokenRequest.data);
          window.location.href = "/explore";
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-base-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="login">
                Login
              </label>
              <Field
                name="username"
                type="text"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.username && touched.username ? " border-error" : "")
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.password && touched.password ? " border-error" : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-primary hover:bg-opacity-60 text-primary-content font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
