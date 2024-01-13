"use client";
import { api } from "@/utils/apiAddress";
import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const cookieStore = useCookies();

  const [loginError, setLoginError] = useState("");

  if (cookieStore.get("token") !== undefined) {
    return redirect("/explore");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const tokenRequest = await axios.post(
              api+"/api/v1/auth/login",
              values,
              { httpsAgent: agent },
            );
            cookieStore.set("token", tokenRequest.data, { expires: 31 });
            window.history.back();
          } catch (err) {
            console.log(err);
            setLoginError("Invalid username or password");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
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
              {!isSubmitting ? (
                <button
                  type="submit"
                  className="bg-primary hover:bg-opacity-60 text-primary-content font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              ) : (
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              )}
            </div>
            {loginError && (
              <div className="text-error text-xs italic">{loginError}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
