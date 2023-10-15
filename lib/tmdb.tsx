import { logger } from '@/utils/logger';

const getTmdbOptions = () => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
});

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// https://www.themoviedb.org/talk/5aeaaf56c3a3682ddf0010de
// ## Add Supported Image Sizes
//                                  Min Res      Max Res
// poster   = Poster ............  500 x 750   2000 x 3000
// backdrop = Fanart ............ 1280 x 720   3840 x 2160
// still    = TV Show Episode ... 1280 x 720   3840 x 2160
// profile  = Actors Actresses ..  300 x 450   2000 x 3000
// logo     = TMDb Logo
export const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
// const movieId = 634649;
// const japanese = 'ja-JP';
const defaultLang = 'en-US';
// const region = 'US';
// const TomHollandId = '5d8e28d38289a0000fcc32f9';

export const getApiUrl = ({
  path,
  appends = ['images', 'videos', 'credits', 'reviews', 'recommendations'],
  lang = defaultLang,
}: {
  path: string;
  appends?: ('images' | 'videos' | 'credits' | 'reviews' | 'recommendations')[];
  lang?: string;
}) => {
  const appendToResponse =
    appends && appends.length > 0
      ? `&append_to_response=${appends.join(',')}`
      : '';

  return `${process.env.NEXT_PUBLIC_TMDB_API_URL}${path}?api_key=${tmdbApiKey}?language=${lang}${appendToResponse}`;
};

export const getApiUrlToDiscoverByGenreId = ({
  genreId,
  appends = ['images', 'videos', 'credits', 'reviews', 'recommendations'],
}: {
  genreId: number;
  appends?: ('images' | 'videos' | 'credits' | 'reviews' | 'recommendations')[];
}) => {
  const appendToResponse =
    appends && appends.length > 0
      ? `&append_to_response=${appends.join(',')}`
      : '';

  return `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}${appendToResponse}`;
};

const getApiData = async ({
  path,
  appends,
  lang = defaultLang,
  genreId,
}: {
  path?: string;
  appends?: ('images' | 'videos' | 'credits' | 'reviews' | 'recommendations')[];
  lang?: string;
  genreId?: number;
}) => {
  const url = genreId
    ? getApiUrlToDiscoverByGenreId({ genreId, appends })
    : getApiUrl({ path: path ?? '', appends, lang });

  try {
    const res = await fetch(url, getTmdbOptions());
    return await res.json();
  } catch (error) {
    logger.log({ error });
    return error;
  }
};

type MediaType = 'all' | 'movie' | 'tv' | 'person';
type TimeWindowType = 'day' | 'week';

export const paths = {
  movieById: (movieId: number) => `/movie/${movieId}`,
  creditById: (creditId: number) => `/credit/${creditId}`,
  movieImagesById: (movieId: number) => `/movie/${movieId}/images`,
  movieVideosById: (movieId: number) => `/movie/${movieId}/videos`,
  movieReviewsById: (movieId: number) => `/movie/${movieId}/reviews`,
  movieRecommendationsById: (movieId: number) =>
    `/movie/${movieId}/recommendations`,
  similarMoviesById: (movieId: number) => `/movie/${movieId}/similar`,
  popularMovies: () => '/movie/popular',
  topRatedMovies: () => '/movie/top_rated',
  trendingMovies: (mediaType?: MediaType, timeWindow?: TimeWindowType) =>
    `/trending/${mediaType}/${timeWindow}`,
  upcomingMovies: (lang?: string, region?: string) => {
    const language = lang ? `?language=${lang}` : '';
    const reg = region ? `?region=${region}` : '';
    return `/movie/upcoming${language}${reg}`;
    // return `/movie/upcoming${language}${reg}`;
  },
  playingMovies: (lang?: string, region?: string) => {
    const language = lang ? `?language=${lang}` : '';
    const reg = region ? `?region=${region}` : '';
    return `/movie/now_playing${language}${reg}`;
  },
  personById: (personId: number) => `/person/${personId}`,
  creditsOfPersonById: (personId: number) =>
    `/person/${personId}/movie_credits`,
  movieProvidersById: (movieId: number, lang?: string) => {
    const language = lang ? `?language=${lang}` : '';
    return `/movie/${movieId}/watch/providers${language}`;
  },
};

export const getMovieById = async (movieId: number) =>
  await getApiData({ path: paths.movieById(movieId) });

export const getCreditById = async (creditId: number) =>
  await getApiData({ path: paths.creditById(creditId) });

export const getMovieImagesById = async (movieId: number) =>
  await getApiData({ path: paths.movieImagesById(movieId) });

export const getMovieVideosById = async (movieId: number) => {
  try {
    const data = await getApiData({
      path: paths.movieVideosById(movieId),
    });
    return data.results[0];
  } catch (error) {
    return error;
  }
};

export const getMovieReviewsById = async (movieId: number) =>
  await getApiData({ path: paths.movieReviewsById(movieId) });

export const getMovieRecommendationsById = async (movieId: number) =>
  await getApiData({ path: paths.movieRecommendationsById(movieId) });

export const getSimilarMoviesById = async (movieId: number) =>
  await getApiData({ path: paths.similarMoviesById(movieId) });

export const getPopularMovies = async () => {
  try {
    const data = await getApiData({ path: paths.popularMovies() });
    return data.results;
  } catch (error) {
    return error;
  }
};

export const getMoviesByGenreId = async (genreId: number) => {
  try {
    const data = await getApiData({ genreId });
    logger.log({ data });
    return data.results;
  } catch (error) {
    return error;
  }
};

export const getTopRatedMovies = async () => {
  try {
    const data = await getApiData({
      path: paths.topRatedMovies(),

      // appends: ['images', 'videos', 'credits', 'reviews', 'recommendations'],
    });
    return data.results;
  } catch (error) {
    return error;
  }
};

export const getTrends = async (
  mediaType: MediaType = 'movie',
  timeWindow: TimeWindowType = 'week',
) => {
  try {
    const data = await getApiData({
      path: paths.trendingMovies(mediaType, timeWindow),
    });
    return await data.results;
  } catch (error) {
    return error;
  }
};

export const getUpcomingMovies = async (
  lang?: string | undefined,
  region?: string | undefined,
) => {
  try {
    const data = await getApiData({
      path: paths.upcomingMovies(lang, region),
    });
    return await data.results;
  } catch (error) {
    return error;
  }
};

export const getProvidersById = async ({
  movieId,
  lang = defaultLang,
}: {
  movieId: number;
  lang?: string;
}) =>
  getApiData({
    path: paths.movieProvidersById(movieId, lang),
  });

export const getPlayingMovies = async ({
  lang = defaultLang,
  region,
}: {
  lang?: string;
  region?: string;
}) =>
  getApiData({
    path: paths.playingMovies(lang, region),
  });

export const getPersonById = async (personId: number) =>
  await getApiData({ path: paths.personById(personId) });

export const getCreditsOfPersonById = async (personId: number) =>
  await getApiData({ path: paths.creditsOfPersonById(personId) });

export const createImageUrl = (filePath: string, imageSize = 'w500') =>
  `${baseImageUrl}/${imageSize}${filePath}`;

//   "backdrop_sizes": [
//   "w300",
//   "w780",
//   "w1280",
//   "original"
// ],
// "logo_sizes": [
//   "w45",
//   "w92",
//   "w154",
//   "w185",
//   "w300",
//   "w500",
//   "original"
// ],
// "poster_sizes": [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"
// ],
// "profile_sizes": [
//   "w45",
//   "w185",
//   "h632",
//   "original"
// ],
// "still_sizes": [
//   "w92",
//   "w185",
//   "w300",
//   "original"
// ]
