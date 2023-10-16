declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    JWT_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;

    DATABASE_URL: string;

    SUPABASE_DATABASE_DIRECT_URL: string;
    SUPABASE_DATABASE_URL: string;
    SUPABASE_PROJECT_URL: string;
    SUPABASE_PROJECT_API_KEY: string;

    NEXT_PUBLIC_TMDB_API_URL: string;
    NEXT_PUBLIC_TMDB_IMAGE_URL: string;
    NEXT_PUBLIC_TMDB_API_KEY: string;
    NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN: string;
    NEXT_PUBLIC_TMDB_AUTHOR_IMAGE_URL: string;

    NEXT_PUBLIC_YOUTUBE_URL: string;
  }
}
