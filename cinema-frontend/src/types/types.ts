export interface Screening {
  id: number;
  date: string;
  time: string;
  movie: Movie;
  auditorium: Auditorium;
}

export interface Auditorium {
  number: number;
  seats: Seat[];
}

export interface Movie {
  title: string;
  description: string;
  released: number;
  imageUrl: string;
  trailer: string;
  directors: Person[];
  actors: Person[];
}

export interface Person {
  name: string;
  born: number;
}

export interface Seat {
  id: number;
  row: number;
  column: number;
  vip: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
