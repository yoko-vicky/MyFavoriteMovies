import uuid from '@/lib/uuid';
import { MovieState, ReviewState } from '@/types/movies';
import { UserMovieState } from '@/types/user';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNum = (max = 10) => Math.floor(Math.random() * max);
export const shapeData = (data: any) => JSON.parse(JSON.stringify(data));
export const getReleaseYear = (date: string) => !!date && date.split('-')[0];
export const excerptText = (text: string, maxLength = 40) => {
  const tail = '...';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + tail;
  }
  return text;
};

export const excerptReview = (text: string, maxLength: number) => {
  return `"${excerptText(text, maxLength)}"`;
};

const distinct = (value: any, index: number, self: any) =>
  self.indexOf(value) === index;

export const getUniqueArr = (arr: any[]) => arr.filter(distinct);
export const getTimestamp = () => Math.floor(Date.now() / 1000);
export const removeExtraSpaceFromStr = (str: string) =>
  str.trim().replaceAll(/\s{2,}/g, ' ');

export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  return `${year}/${month + 1}`;
};

export const createReviewItemsFromUserMoviesInDb = (
  userMoviesInDb: UserMovieState[],
) =>
  userMoviesInDb.map((um) => ({
    id: uuid(),
    author: um.user?.name || '',
    author_details: {
      name: um.user?.name || '',
      username: um.user?.name || '',
      avatar_path: null,
      rating: null,
    },
    content: um.comment,
    stars: um.stars,
    created_at: um.createdAt,
    updated_at: um.updatedAt,
    url: '',
    imageUrl: um.user?.image,
    userId: um.userId,
    movieId: um.movieId,
  })) as ReviewState[];

export const getMoviesFromUserMovies = (userMovies: UserMovieState[]) =>
  userMovies.filter((um) => !!um.movie).map((um) => um.movie) as MovieState[];
