import { MovieState } from './movies';

export interface UserState {
  id: number;
  email: string;
  name: string | null;
  image: string | null;
  userMovies?: UserMovie[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMovie {
  id: number;
  user?: UserState;
  userId: number;
  movie?: MovieState;
  movieId: number;
  listed: boolean;
  watched: boolean;
  stars: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
