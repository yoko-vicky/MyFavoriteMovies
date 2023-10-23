import { MovieState } from './movies';

export interface UserState {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  bio?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  userMovies?: UserMovieState[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMovieState {
  id: number;
  user?: UserState;
  userId: string;
  movie?: MovieState;
  movieId: number;
  listed: boolean;
  watched: boolean;
  stars: number;
  isPublicReview: boolean;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
