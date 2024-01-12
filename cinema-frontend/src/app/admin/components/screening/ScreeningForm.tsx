import React, { useEffect } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useScreeningDispatch } from "./ScreeningContext";
import { addScreening } from "./screeningUtils";
import { Auditorium, Movie, Screening } from "@/types/types";
import { Type } from "./screeningReducer";
import { formatDateForInput } from "@/utils/formatDateForInput";
import { fetchMovies } from "@/utils/fetchMovies";
import { v4 as uuidv4 } from "uuid";
import { fetchAuditoriums } from "@/utils/fetchAuditoriums";

const ScreeningSchema = Yup.object().shape({
  movie: Yup.string(),
  date: Yup.date()
    .required("Required")
    .min(new Date(), "Cannot add past dates"),
  auditorium: Yup.number().required("Required"),
});

const ScreeningForm = ({
  selectedScreening: selectedScreening,
  token,
}: {
  selectedScreening: Screening | null;
  token: string;
}) => {
  const [movies, setMovies] = React.useState<Movie[] | null>(null);
  const [auditoriums, setAuditoriums] = React.useState<Auditorium[] | null>(
    null,
  );
  useEffect(() => {
    const fetchAndSet = async () => {
      const movies = await fetchMovies();
      setMovies(movies);
      const auditoriums = await fetchAuditoriums();
      setAuditoriums(auditoriums);
    };

    fetchAndSet();
  });
  const dispatch = useScreeningDispatch();
  if (!dispatch || movies === null || auditoriums === null)
    return <div className="loading">Loading...</div>;
  return (
    <Formik
      initialValues={{
        id: selectedScreening?.id || uuidv4(),
        movie: selectedScreening?.movie || "",
        date: formatDateForInput(new Date(selectedScreening?.date || "")) || "",
        auditorium: selectedScreening?.auditorium.number || "",
      }}
      validationSchema={ScreeningSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (selectedScreening === null) {
          try {
            dispatch({
              type: Type.ADD_SCREENING,
              payload: {
                token: token,
                screening: {
                  id: uuidv4(),
                  movie: movies.find((f) => f.title === values.movie) || null,
                  date: new Date(values.date),
                  auditorium:
                    auditoriums.find((f) => f.number === values.auditorium) ||
                    null,
                },
              },
            });
            alert("Screening added");
          } catch (err: any) {
            alert(err.response.data);
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        } else {
          try {
            dispatch({
              type: Type.MODIFY_SCREENING,
              payload: {
                token: token,
                movie: values,
              },
            });
            alert("Screening modified");
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
            <label htmlFor="movie">Movie: </label>
            <Field name="movie" as="select">
              {movies.map((movie) => (
                <option key={movie.title} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </Field>
          </div>
          <div>
            <label className="pr-2 " htmlFor="date">
              Date:
            </label>
            <Field name="date" type="datetime-local" component={Input} />
          </div>
          <div>
            <label htmlFor="auditorium">Image: </label>
            <Field name="auditorium" as="select">
              <option value={1}>Auditorium 1</option>
              <option value={2}>Auditorium 2</option>
              <option value={3}>Auditorium 3</option>
            </Field>
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
