const user = [
  {
    id: 1,
    email: 'yoco@yoco.com',
    name: 'yoco',
  },
  {
    id: 2,
    email: 'asahi@asahi.com',
    name: 'asahi',
  },
];

const genre = [
  {
    id: 1,
    name: 'Adventure',
  },
  {
    id: 2,
    name: 'Fantasy',
  },
  {
    id: 3,
    name: 'Children',
  },
  {
    id: 4,
    name: 'Romance',
  },
  {
    id: 5,
    name: 'Comedy',
  },
  {
    id: 6,
    name: 'Drama',
  },
  {
    id: 7,
    name: 'Science Fiction',
  },
];

const movie = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    description:
      'A popular fantasy book series written by J.K. Rowling that was adapted into a successful film series.',
    released: 2001,
    // genres: [genre[0], genre[1], genre[2]],
  },
  {
    id: 2,
    title: 'Back to the Future',
    description:
      'The first film introduces us to Marty McFly (played by Michael J. Fox) and Dr. Emmett Doc Brown (played by Christopher Lloyd).',
    released: 1985,
    // genres: [genre[1], genre[2], genre[7]],
  },
  {
    id: 3,
    title: 'The Terminal',
    description:
      'This is a comedy-drama film directed by Steven Spielberg, starring Tom Hanks and Catherine Zeta-Jones. ',
    released: 2004,
    // genres: [genre[4], genre[5], genre[6]],
  },
];

const userMovie = [
  {
    id: 1,
    userId: 1,
    movieId: 1,
    watched: true,
    star: 4,
    comment: 'Interesting',
  },
  {
    id: 2,
    userId: 1,
    movieId: 2,
    watched: true,
    star: 5,
    comment: 'Amazing',
  },
  {
    id: 3,
    userId: 2,
    movieId: 3,
    watched: false,
  },
];

const dbSeed = {
  user,
  // movie,
  // genre,
  // userMovie,
};

export default dbSeed;
