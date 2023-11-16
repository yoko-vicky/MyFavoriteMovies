import { SwiperOptions } from 'swiper/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VideoState {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: true;
  published_at: Date;
  site: string;
  size: number;
  type: string;
}

export interface MovieGenreState {
  id: number;
  name: string;
}

export interface MovieState {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres?: MovieGenreState[];
  id: number;
  imdb_id?: string;
  original_language: string;
  spoken_languages: SpokenLanguageState[];
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // '1994-09-23';
  title: string;
  video: boolean;
  videos?: { results: VideoState[] };
  vote_average: number;
  vote_count: number;
  credits?: CreditState;
  belongs_to_collection?: any;
  budget?: number;
  revenue?: number;
  homepage?: string;
  runtime?: number;
  images?: MovieImagesState;
  production_companies?: ProductionCompanyState[];
  production_countries?: ProductionCountryState[];
  recommendations?: {
    page: number;
    results: RecommendationState[];
    total_pages: number;
    total_results: number;
  };
  reviews?: {
    page: number;
    results: ReviewState[];
    total_pages: number;
    total_results: number;
  };
  status?: string;
  tagline?: string;
}

export interface SpokenLanguageState {
  english_name: string; //'Hindi';
  iso_639_1: string; //'hi';
  name: string; //'हिन्दी';
}

export interface RecommendationState {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // '1994-09-23';
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface ReviewState {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: null;
    rating: null;
  };
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
  imageUrl?: string | undefined | null;
  userId?: string;
  movieId?: number;
  stars?: number;
}

export interface ProductionCompanyState {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string; // 'IN'
}

export interface ProductionCountryState {
  iso_3166_1: string; // 'IN'
  name: string; //'India';
}

export interface MovieImagesState {
  backdrops: MovieImageState[];
  logos: MovieImageState[];
  posters: MovieImageState[];
}

export interface MovieImageState {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CreditState {
  cast: CreditItemState[];
  crew: CreditItemState[];
  [key: string]: CreditItemState[];
}

export interface CreditItemState {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number; // 1 or 2
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number; // decimal
  profile_path: string;
  job?: string;
}

export enum SliderDelay {
  SLOW = 3400,
  DEFAULT = 2700,
  FAST = 2200,
}

export type UserMovieListedWatchedState = 'unlisted' | 'listed' | 'watched';

export interface UpdateUserMovieStatusState {
  listed?: boolean;
  watched?: boolean;
  stars?: number;
  comment?: string | null;
  isPublicReview?: boolean;
}
export interface UpdateUserMovieState {
  status: UpdateUserMovieStatusState;
  movie: MovieState;
}

export interface SliderBreakPointState {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
}

export enum WatchedStatus {
  LISTED = 'listed',
  WATCHED = 'watched',
  ALL = 'all',
}

export type AgeState =
  | '1930'
  | '1940'
  | '1950'
  | '1960'
  | '1970'
  | '1980'
  | '1990'
  | '2000'
  | '2010'
  | '2020'
  | 'All';

export const agesArr = [
  'All',
  '1930',
  '1940',
  '1950',
  '1960',
  '1970',
  '1980',
  '1990',
  '2000',
  '2010',
  '2020',
] as AgeState[];

export type StarType = '0' | '1' | '2' | '3' | '4' | '5';
export type StarRateState = '0' | '1' | '2' | '3' | '4' | '5' | 'All';

export const starRateArr = ['1', '2', '3', '4', '5', 'All'] as StarRateState[];

export enum MovieCollectionState {
  TOP_RATED = 'top_rated',
  POPULAR = 'popular',
  TRENDING = 'trending',
  UPCOMING = 'upcoming',
}
