export interface Screening {
  id: number;
  date: string;
  time: string;
  movie: {
    title: string;
    description: string;
  };
  auditorium: {
    number: number;
    seats: number;
  };
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
