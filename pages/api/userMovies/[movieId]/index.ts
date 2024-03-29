import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';
import { prisma } from '@/lib/prisma';
import { UpdateUserMovieState } from '@/types/movies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { movieId } = req.query;

  if (!movieId) {
    return res.status(404).json({ message: 'movieId is missing.' });
  }

  if (req.method === 'GET') {
    try {
      const userMovies = await prisma.userMovie.findMany({
        where: {
          movieId: +movieId,
        },
        include: {
          user: true,
        },
      });

      res.status(200).json({
        message: `Successfully got all userMovies with movieId: ${movieId}`,
        data: userMovies || [],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { userId } = req.query;
    const { movie, status } = req.body as UpdateUserMovieState;

    if (!userId) {
      return res.status(404).json({ message: 'userId is missing.' });
    }

    if (!movie || !status) {
      return res.status(404).json({ message: 'request body is missing.' });
    }

    // Check Session
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    if (session.user.id !== (userId as string)) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const movieGenres = movie.genres
      ? movie.genres.map((genre) => ({
          where: {
            id: genre.id,
          },
          create: {
            id: genre.id,
            name: genre.name,
          },
        }))
      : undefined;

    try {
      const upsertMovie = await prisma.movie.upsert({
        where: {
          id: +movieId,
        },
        create: {
          id: +movieId,
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          status: movie.status,
          backdrop_path: movie.backdrop_path,
          adult: movie.adult,
          popularity: movie.popularity,
          genres: {
            connectOrCreate: movieGenres,
          },
        },
        update: {},
      });

      if (!upsertMovie) {
        return res.status(404).json({ message: 'Movie was not upserted' });
      }

      const upsertUserMovie = await prisma.userMovie.upsert({
        where: {
          userMovieId: {
            userId: userId as string,
            movieId: upsertMovie.id,
          },
        },
        create: {
          userId: userId as string,
          movieId: upsertMovie.id,
          ...status,
        },
        update: {
          ...status,
        },
      });

      if (!upsertUserMovie) {
        return res.status(404).json({ message: 'UserMovie was not upserted' });
      }

      return res
        .status(200)
        .json({ message: 'Successfully updated', data: upsertUserMovie });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Something went wrong.', error: error.message });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method is not allowed.` });
  }
}
