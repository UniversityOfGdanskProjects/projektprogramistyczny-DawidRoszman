"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Z]./, "Must start with capital letter")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[A-Z]./, "Must start with capital letter")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          //TODO: do something with the form values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-base-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <Field
                name="firstName"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.firstName && touched.firstName ? " border-error" : "")
                }
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.lastName && touched.lastName ? " border-error" : "")
                }
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (errors.email && touched.email ? " border-error" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-error text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <Field
                name="username"
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
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
