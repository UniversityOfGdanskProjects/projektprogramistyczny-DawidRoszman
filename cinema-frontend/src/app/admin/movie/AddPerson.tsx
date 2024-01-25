import { Person } from "@/types/types";
import React from "react";

const AddPerson = ({
  person,
  addPerson,
}: {
  person: Person[];
  addPerson: (person: string) => void;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedPerson = e.currentTarget.person.value;
    console.log(selectedPerson);
    addPerson(selectedPerson);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <select id="person" name="person" className="select">
          {person.map((person) => {
            return (
              <option key={person.name} value={person.name}>
                {person.name}
              </option>
            );
          })}
        </select>
        <input type="submit" className="btn btn-primary btn-sm" value="+" />
      </form>
    </div>
  );
};

export default AddPerson;
