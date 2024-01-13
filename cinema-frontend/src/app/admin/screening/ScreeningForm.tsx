import React, { useEffect } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useScreeningDispatch } from "./ScreeningContext";
import { addScreening, updateScreening } from "./screeningUtils";
import { Auditorium, Movie, Screening } from "@/types/types";
import { Type } from "./screeningReducer";
import { formatDateForInput } from "@/utils/formatDateForInput";
import { fetchMovies } from "@/utils/fetchMovies";
import { fetchAuditoriums } from "@/utils/fetchAuditoriums";
import { UUID } from "crypto";
import { v4 } from "uuid";
import { useToken } from "@/app/components/TokenContext";

const ScreeningSchema = Yup.object().shape({
  movie: Yup.string(),
  date: Yup.date()
    .required("Required")
    .min(new Date(), "Cannot add past dates"),
  auditorium: Yup.number().required("Required"),
});

const ScreeningForm = ({
  selectedScreening: selectedScreening,
}: {
  selectedScreening: Screening | null;
}) => {
  const [movies, setMovies] = React.useState<Movie[] | null>(null);
  const [auditoriums, setAuditoriums] = React.useState<Auditorium[] | null>(
    null,
  );
  const token = useToken();
  useEffect(() => {
    const fetchAndSetMovies = async () => {
      const movies = await fetchMovies();
      setMovies(movies);
    };
    const fetchAndSetAuditoriums = async () => {
      const auditoriums = await fetchAuditoriums();
      setAuditoriums(auditoriums);
    };

    fetchAndSetAuditoriums();
    fetchAndSetMovies();
  }, []);
  const dispatch = useScreeningDispatch();
  if (!token) return null;
  if (!dispatch || movies === null || auditoriums === null)
    return <div className="loading">Loading...</div>;
  return (
    <Formik
      initialValues={{
        id: selectedScreening?.id || (v4() as UUID),
        movie: selectedScreening?.movie.title || movies[0].title,
        date: formatDateForInput(new Date(selectedScreening?.date || "")) || "",
        auditorium:
          selectedScreening?.auditorium.number || auditoriums[0].number,
      }}
      validationSchema={ScreeningSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const data = {
          token: token.token,
          screening: {
            movieTitle: values.movie,
            date: new Date(values.date),
            auditoriumNumber: values.auditorium,
          },
        };
        if (selectedScreening === null) {
          try {
            const screening = await addScreening(data);
            dispatch({
              type: Type.ADD_SCREENING,
              payload: screening,
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
            const screening = await updateScreening({
              token: token.token,
              screening: {
                id: values.id,
                movieTitle: values.movie,
                date: new Date(values.date),
                auditoriumNumber: values.auditorium,
              },
            });
            dispatch({
              type: Type.MODIFY_SCREENING,
              payload: screening,
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
            <Field name="movie" component={Select}>
              {movies
                .toSorted((a, b) => {
                  return a.title.localeCompare(b.title);
                })
                .map((movie) => (
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
            <Field name="auditorium" component={Select}>
              {auditoriums.map((auditorium) => (
                <option key={auditorium.number} value={auditorium.number}>
                  Auditorium {auditorium.number}
                </option>
              ))}
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

function Select({ field, form: { touched, errors }, ...props }: any) {
  return (
    <div>
      <select
        {...field}
        {...props}
        className="select select-bordered select-primary"
      >
        {props.children}
      </select>
      {touched[field.name] && errors[field.name] && (
        <div className="text-error">{errors[field.name]}</div>
      )}
    </div>
  );
}

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
