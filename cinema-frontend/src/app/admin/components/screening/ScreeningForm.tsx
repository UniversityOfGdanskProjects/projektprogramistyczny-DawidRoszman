import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Screening } from "./screeningReducer";
import { useScreeningDispatch } from "./ScreeningContext";
import { randomUUID } from "crypto";
import { addScreening } from "./screeningUtils";

const ScreeningSchema = Yup.object().shape({
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

const ScreeningForm = ({
  selectedScreening: selectedScreening,
  token,
}: {
  selectedScreening: Screening | null;
  token: string;
}) => {
  const dispatch = useScreeningDispatch();
  if (!dispatch) return <div>Loading...</div>;
  return (
    <Formik
      initialValues={{
        id: selectedScreening?.id || randomUUID(),
        movie: selectedScreening?.movie || "",
        date: selectedScreening?.date || new Date(),
        auditorium: selectedScreening?.auditorium || "",
      }}
      validationSchema={ScreeningSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (selectedScreening === null) {
          try {
            await addScreening({
              screening: {
                id: values.id,
                movie: values.movie,
                date: `${values.date.getFullYear()}-${values.date.getMonth()}-${values.date.getDay()}`,
                time: `${values.date.getHours()}:${values.date.getMinutes()}`,
              },
              token,
            });
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
            await modifyMovie({ movie: values, token });
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
            {selectedScreening ? (
              <div>{selectedScreening.title}</div>
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

export default ScreeningForm;
