/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateUserMovieState } from '@/types/movies';
import axios from 'axios';

const customHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const getData = async (path: string, signal?: AbortSignal) =>
  await axios.get(path, { signal, headers: customHeaders });

export const postData = async (path: string, obj?: any, signal?: AbortSignal) =>
  await axios.post(path, obj, { signal, headers: customHeaders });

export const updateData = async (
  path: string,
  obj: any,
  signal?: AbortSignal,
) => await axios.put(path, obj, { signal, headers: customHeaders });

export const patchData = async (path: string, obj: any, signal?: AbortSignal) =>
  await axios.patch(path, obj, { signal, headers: customHeaders });

export const deleteData = async (path: string, signal?: AbortSignal) =>
  await axios.delete(path, { signal, headers: customHeaders });

export const updateUserMovie = async ({
  movieId,
  userId,
  state,
  signal,
}: {
  movieId: number;
  userId: string;
  state: any;
  signal?: AbortSignal;
}) => {
  const path = `/api/userMovies/${movieId}?userId=${userId}`;
  return await updateData(
    path,
    {
      ...state,
    } as UpdateUserMovieState,
    signal,
  );
};
