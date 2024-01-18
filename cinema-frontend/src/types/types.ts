import { UUID } from "crypto";

export interface Screening {
  id: UUID;
  date: Date;
  movie: Movie;
  auditorium: Auditorium;
}

export interface Ticket {
  id: UUID;
  screeningDate: string;
  movieTitle: string;
  auditoriumNumber: number;
  seats: Seat[];
  price: number;
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
  directors?: Person[];
  actors?: Person[];
}

export interface Person {
  name: string;
  born: number;
}

export interface Seat {
  id: string;
  row: number;
  column: number;
  vip: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
