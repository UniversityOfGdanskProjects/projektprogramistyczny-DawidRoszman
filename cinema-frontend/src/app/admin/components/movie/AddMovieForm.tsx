import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Movie, Type } from "./movieReducer";
import { useMovieDispatch } from "./MovieContext";

const MovieSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[A-Z]./, "Must start with a capital letter")
    .required("Required"),
  description: Yup.string()
    .matches(/^[A-Z]./, "Must start with a capital letter")
    .required("Required"),
  released: Yup.number()
    .required("Required")
    .min(1900, "Cannot add movies released before 1900")
    .max(2024, "Cannot add movies from the future"),
  imageUrl: Yup.string().url("Must be a vaild url").required("Required"),
  trailer: Yup.string().url("Must be a vaild url").required("Required"),
});

const AddMovieForm = ({token} : {token: string}) => {
  const dispatch = useMovieDispatch();
  if (!dispatch) return <div>Loading...</div>;
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        released: 2024,
        imageUrl: "",
        trailer: "",
      }}
      validationSchema={MovieSchema}
      onSubmit={(values) => {
        dispatch({
          type: Type.ADD_MOVIE,
          payload: {
            token: token, 
            movie: values,
          },
        });
      }}
    >
      {({ errors, touched, handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-2 border-black justify-center items-center p-4"
        >
          <div>
            <label htmlFor="title">Title: </label>
            <Field name="title" type="text" />
            {errors.title && touched.title && errors.title}
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <Field name="description" type="textarea" />
            <br />
            {errors.description && touched.description && errors.description}
          </div>
          <div>
            <label className="pr-2 " htmlFor="released">
              Year of release:{" "}
            </label>
            <Field name="released" type="number" />
            <br />
            {errors.released && touched.released && errors.released}
          </div>
          <div>
            <label htmlFor="imageUrl">Image: </label>
            <Field name="imageUrl" type="text" />
            <br />
            {errors.imageUrl && touched.imageUrl && errors.imageUrl}
          </div>
          <div>
            <label htmlFor="trailer">Trailer: </label>
            <Field name="trailer" type="text" />
            <br />
            {errors.trailer && touched.trailer && errors.trailer}
          </div>
          <div>
            <button
              className="btn btn-primary"
              disabled={isSubmitting}
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddMovieForm;
