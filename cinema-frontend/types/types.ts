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
