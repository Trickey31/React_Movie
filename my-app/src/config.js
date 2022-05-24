export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "47f6750b8c18f181347cb9773748a4f6";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbImgOriginal = "https://image.tmdb.org/t/p/original";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieDetails: (moviesID) =>
    `${tmdbEndpoint}/${moviesID}?api_key=${apiKey}`,
  getMovieMeta: (moviesID, type) =>
    `${tmdbEndpoint}/${moviesID}/${type}?api_key=${apiKey}`,
  getMovieUrl: (type, page) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieSearch: (query, page) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`,
  movieImage: (url) => `${tmdbImgOriginal}/${url}`,
};
