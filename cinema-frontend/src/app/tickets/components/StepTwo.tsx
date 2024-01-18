"use client";
import { Seat } from "@/types/types";
import { Field, Form, Formik } from "formik";
import React from "react";

const StepTwo = ({
  seats,
  selectedSeats,
  setDiscounts,
  setStep,
}: {
  seats: Seat[];
  selectedSeats: string[];
  setDiscounts: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          ...selectedSeats.reduce((acc, curr) => {
            //@ts-ignore
            acc[curr] = "NONE";
            return acc;
          }, {}),
        }}
        onSubmit={(values) => {
          console.log(values);
          setDiscounts(values);
          setStep(3);
        }}
      >
        <Form>
          {seats
            .filter((s) => selectedSeats.includes(s.id))
            .map((seat) => {
              return (
                <div key={seat.id}>
                  <label>
                    Select discount for seat: {seat.row} - {seat.column}
                  </label>
                  <Field
                    name={seat.id}
                    as="select"
                    className="m-2 select select-primary"
                  >
                    <option disabled>Choose you discount</option>
                    <option value="NONE">None</option>
                    <option value="STUDENT">Student</option>
                    <option value="ELDERLY">Elderly</option>
                    <option value="CHILD">Child</option>
                  </Field>
                </div>
              );
            })}
          <button type="submit" className="btn btn-primary">
            Confirm discounts
          </button>
        </Form>
      </Formik>
      <form action=""></form>
    </div>
  );
};

export default StepTwo;
