import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Movie, Type } from "./movieReducer";
import { useMovieDispatch } from "./MovieContext";
import { addMovie, modifyMovie } from "./movieUtils";
import { useToken } from "@/app/components/TokenContext";

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
  trailer: Yup.string()
    .matches(/https:\/\/www.youtube.com\/embed\/.*/, "Must be a embed video")
    .url("Must be a vaild url")
    .required("Required"),
});

const MovieForm = ({ selectedMovie }: { selectedMovie: Movie | null }) => {
  const dispatch = useMovieDispatch();
  const token = useToken();
  if (token === null) return <div>Loading...</div>;
  if (!dispatch) return <div>Loading...</div>;
  return (
    <Formik
      initialValues={{
        title: selectedMovie?.title || "",
        description: selectedMovie?.description || "",
        released: selectedMovie?.released || 2024,
        imageUrl: selectedMovie?.imageUrl || "",
        trailer: selectedMovie?.trailer || "",
      }}
      validationSchema={MovieSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (selectedMovie === null) {
          try {
            if (token.token === null) return;
            await addMovie({ movie: values, token: token.token });
            dispatch({
              type: Type.ADD_MOVIE,
              payload: {
                token: token,
                movie: values,
              },
            });
            alert("Movie added");
          } catch (err: any) {
            alert(err.response.data);
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        } else {
          try {
            if (token.token === null) return;
            await modifyMovie({ movie: values, token: token.token });
            dispatch({
              type: Type.MODIFY_MOVIE,
              payload: {
                token: token,
                movie: values,
              },
            });
            alert("Movie modified");
          } catch (err: any) {
            alert(err);
            console.log(err.response.data);
          } finally {
            setSubmitting(false);
          }
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-2 border-neutral rounded-lg justify-center items-center p-4"
        >
          <div>
            {selectedMovie ? (
              <div>{selectedMovie.title}</div>
            ) : (
              <>
                <label htmlFor="title">Title: </label>
                <Field id="title" name="title" type="text" component={Input} />
              </>
            )}
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <Field name="description" type="textarea" component={Input} />
          </div>
          <div>
            <label className="pr-2 " htmlFor="released">
              Year of release:{" "}
            </label>
            <Field name="released" type="number" component={Input} />
          </div>
          <div>
            <label htmlFor="imageUrl">Image: </label>
            <Field name="imageUrl" type="text" component={Input} />
          </div>
          <div>
            <label htmlFor="trailer">Trailer: </label>
            <Field name="trailer" type="text" component={Input} />
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

function Input({ field, form: { touched, errors }, ...props }: any) {
  return (
    <div>
      <input {...field} {...props} className="input input-primary" />
      {touched[field.name] && errors[field.name] && (
        <div className="text-error">{errors[field.name]}</div>
      )}
    </div>
  );
}

export default MovieForm;
