import { MovieState } from './movies';

export interface UserState {
  id: string;
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
  userId: string;
  movie?: MovieState;
  movieId: number;
  listed: boolean;
  watched: boolean;
  stars: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
