const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

if (!API_KEY) throw new Error("Missing VITE_TMDB_API_KEY");

async function fetchMovies(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}&api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

export const getPopularMovies = async () => {
  return fetchMovies("/movie/popular?");
};

export const searchMovies = async (query) => {
  return fetchMovies(`/search/movie?query=${encodeURIComponent(query)}`);
};
